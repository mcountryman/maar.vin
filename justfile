# Build site and output into `target/www`
build:
    cargo run

# Run tests
test:
    cargo test

# Run static code checks
check: check-rs check-md check-jinja

check-rs:
    cargo fmt --check
    cargo clippy --all-targets -- -Dwarnings

check-md:
    prettier --check www
    markdownlint www/pages

check-jinja:
    djlint --quiet --lint --profile=jinja --ignore=J018 www/templates/**.jinja
    djlint --quiet --check www/templates/**.jinja   

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
    
