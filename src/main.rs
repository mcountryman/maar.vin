mod markdown;
mod template;
mod walk;

use std::collections::{HashMap, hash_map};
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::{Instant, SystemTime, UNIX_EPOCH};
use template::Template;

fn main() -> anyhow::Result<()> {
  let time = Instant::now();
  let out = PathBuf::from("target/www");

  println!("Generating {out:?}");

  if out.exists() {
    fs::remove_dir_all(&out)?;
  }

  println!("  Cleaned {out:?}");

  let mut templates = HashMap::new();

  // Render markdown files in `www/pages` and dump to `out`
  for path in walk::dir("www/pages", is_markdown)? {
    let time = Instant::now();
    let path = path?;
    let modified = modified(&path)?;

    let target = out.join(path.strip_prefix("www/pages")?);
    let target = target.with_extension("html");

    let input = fs::read(&path)?;
    let input = String::from_utf8(input)?;
    let rendered = render(&mut templates, &modified, &input)?;

    if let Some(parent) = target.parent() {
      fs::create_dir_all(parent)?;
    }

    fs::write(&target, &rendered)?;

    println!("  Rendered {path:?} in {:.2?}", time.elapsed());
  }

  // Copy files from `www/static` into `out`
  for path in walk::dir("www/static", |path| path.is_file())? {
    let path = path?;
    let target = out.join(path.strip_prefix("www/static")?);

    if let Some(parent) = target.parent() {
      fs::create_dir_all(parent)?;
    }

    fs::copy(&path, target)?;

    println!("  Copied {path:?}");
  }

  println!("Done in {:.2?}", time.elapsed());

  Ok(())
}

fn render(
  templates: &mut HashMap<String, Template>,
  modified: &str,
  input: &str,
) -> anyhow::Result<String> {
  let meta = markdown::parse_yaml_metadata(input)?;

  let template = *meta.get("template").unwrap_or(&"main.jinja");
  let template = get_or_load_template(templates, template)?;

  let main = markdown::render_html(input);
  let build = timestamp().to_string();

  Ok(template.render(|name| match name {
    "main" => Some(&main),
    "build" => Some(&build),
    "today" => Some(&modified),
    "head" if option_env!("DEV").is_some() => {
      Some(r#"<script defer src="/script/reload.js"></script>"#)
    }
    name => meta.get(name).copied(),
  }))
}

fn get_or_load_template<'a>(
  templates: &'a mut HashMap<String, Template>,
  name: &str,
) -> anyhow::Result<&'a Template> {
  match templates.entry(name.to_string()) {
    hash_map::Entry::Occupied(entry) => Ok(entry.into_mut()),
    hash_map::Entry::Vacant(entry) => {
      let source = fs::read(format!("www/templates/{name}"))?;
      let source = String::from_utf8(source)?;

      Ok(entry.insert(Template::new(&source)?))
    }
  }
}

fn is_markdown(path: &Path) -> bool {
  let extension = path.extension().unwrap_or_default();
  let extension = extension.to_string_lossy();

  &extension == "md"
}

fn modified(path: &Path) -> anyhow::Result<String> {
  let output = Command::new("git")
    .arg("log")
    // git log -1 --pretty="format:%aI" -- www/pages/index.md
    .arg("-1")
    .arg("--pretty=format:%aI")
    .arg("--")
    .arg(path)
    .output()?;

  let date = String::from_utf8(output.stdout)?;
  let date = date.trim();

  if date.is_empty() {
    anyhow::bail!("no git history for {path:?}");
  }

  Ok(date.to_owned())
}

fn timestamp() -> u128 {
  let now = SystemTime::now();
  let time = now.duration_since(UNIX_EPOCH).unwrap();

  time.as_millis()
}
