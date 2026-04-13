use pulldown_cmark::{Options, Parser, html};
use std::collections::HashMap;

/// Returns the given markdown rendered as HTML.
pub fn render_html(input: &str) -> String {
  let mut html = String::new();

  let parser = Parser::new_ext(input, Options::all());

  html::push_html(&mut html, parser);
  html
}

/// Returns parsed `yaml` style metadata from the given input text.
pub fn parse_yaml_metadata(input: &str) -> anyhow::Result<HashMap<&str, &str>> {
  let mut lines = input.split('\n').peekable();
  let mut metadata = HashMap::new();

  if !matches!(lines.next(), Some(x) if x.trim() == "---") {
    anyhow::bail!("Missing leading `---` metadata marker");
  }

  while let Some(line) = lines.peek() {
    let Some((key, val)) = line.split_once(':') else {
      break;
    };

    lines.next();
    metadata.insert(key.trim(), val.trim());
  }

  if !lines.any(|line| line.trim() == "---") {
    anyhow::bail!("Missing trailing `---` metadata marker");
  }

  Ok(metadata)
}
