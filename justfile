# Build site and output into `target/www`
build:
    cargo run

# Run tests
test:
    cargo test

# Run static code checks
lint:
    cargo fmt --check
    cargo clippy -- -D warnings
    dprint check
    djlint www/templates/**.jinja

# Serve site
serve: build
    miniserve \
        --pretty-urls \
        --index index.html \
        --header "Cache-Control:no-cache" \
        target/www

# Watch for file changes and serve site
watch:
    DEV=1 watchexec --no-meta -r -- just serve
    
