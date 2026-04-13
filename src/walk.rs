use std::fs::{self, DirEntry, FileType, ReadDir};
use std::io;
use std::path::{Path, PathBuf};

/// Returns a filtered, recursive dir entry iterator over the given folder.
pub fn dir<P, F>(folder: P, filter: F) -> io::Result<Walk<F>>
where
  P: AsRef<Path>,
  F: Fn(&Path) -> bool,
{
  Ok(Walk {
    dirs: vec![fs::read_dir(folder)?],
    filter,
  })
}

/// A recursive dir entry iterator returned by [dir].
pub struct Walk<F> {
  dirs: Vec<ReadDir>,
  filter: F,
}

impl<F> Iterator for Walk<F>
where
  F: Fn(&Path) -> bool,
{
  type Item = io::Result<PathBuf>;

  fn next(&mut self) -> Option<Self::Item> {
    // We're using `last_mut` here to make code a bit cleaner.  This might
    // actually lead to a reduction in [ReadDir] iterators but, I don't care to
    // check.
    loop {
      match self.dirs.last_mut()?.next().map(into_type_and_path) {
        Some(Err(err)) => break Some(Err(err)),
        Some(Ok((_, path))) if (self.filter)(&path) => break Some(Ok(path)),
        Some(Ok((kind, path))) if kind.is_dir() => match fs::read_dir(path) {
          Ok(dir) => self.dirs.push(dir),
          Err(err) => break Some(Err(err)),
        },
        Some(Ok(_)) => {}
        None => {
          self.dirs.pop();
        }
      }
    }
  }
}

fn into_type_and_path(entry: io::Result<DirEntry>) -> io::Result<(FileType, PathBuf)> {
  let entry = entry?;
  let file_type = entry.file_type()?;
  let path = entry.path();

  Ok((file_type, path))
}
