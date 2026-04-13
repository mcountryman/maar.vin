/// Represents a template that can be rendered.
#[derive(Debug)]
pub struct Template {
  chunks: Vec<Chunk>,
}

impl Template {
  /// Return a new parsed template.
  pub fn new(mut input: &str) -> anyhow::Result<Self> {
    let mut chunks = Vec::new();

    while let Some((chunk, rem)) = input.split_once("{{") {
      let Some((name, rem)) = rem.split_once("}}") else {
        anyhow::bail!("Missing closing `}}}}` brace");
      };

      if name.contains("{{") {
        anyhow::bail!("Nested replacements not supported");
      }

      let name = name.trim();
      if name.is_empty() {
        anyhow::bail!("Invalid name, expected at least one alphanumeric char");
      }

      input = rem;
      chunks.push(Chunk::Literal(chunk.to_string()));
      chunks.push(Chunk::Variable(name.to_string()));
    }

    if !input.is_empty() {
      chunks.push(Chunk::Literal(input.to_string()));
    }

    Ok(Self { chunks })
  }

  /// Returns a rendered template with the given variable replacements.
  pub fn render<'a, F>(&self, replace: F) -> String
  where
    F: Fn(&str) -> Option<&'a str>,
  {
    let mut rendered = String::new();

    for chunk in self.chunks.iter() {
      match chunk {
        Chunk::Literal(str) => rendered.push_str(str),
        Chunk::Variable(name) => {
          if let Some(value) = replace(name.as_str()) {
            rendered.push_str(value);
          }
        }
      }
    }

    rendered
  }
}

#[derive(Debug)]
enum Chunk {
  Literal(String),
  Variable(String),
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn leading() {
    let template = Template::new(r#"{{ var0 }} 0"#).unwrap();
    let rendered = template.render(|_| Some("value0"));

    assert_eq!(&rendered, "value0 0");
  }

  #[test]
  fn trailing() {
    let template = Template::new(r#"0 {{ var0 }}"#).unwrap();
    let rendered = template.render(|_| Some("value0"));

    assert_eq!(&rendered, "0 value0");
  }

  #[test]
  #[should_panic]
  fn missing_closing_brace() {
    Template::new("{{ ").unwrap();
  }

  #[test]
  #[should_panic]
  fn nested_variable() {
    Template::new("{{ {{ }} }}").unwrap();
  }

  #[test]
  #[should_panic]
  fn invalid_name() {
    Template::new("{{  }}").unwrap();
  }
}
