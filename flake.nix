{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    rust-overlay.url = "github:oxalica/rust-overlay";
    rust-overlay.inputs.nixpkgs.follows = "nixpkgs";

    utils.url = "github:numtide/flake-utils";
  };

  outputs =
    inputs:
    inputs.utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import inputs.nixpkgs { inherit system overlays; };
        rust-bin = pkgs.rust-bin.fromRustupToolchainFile ./rust-toolchain.toml;
        overlays = [
          inputs.rust-overlay.overlays.default
        ];
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            # utilities
            just
            djlint
            dprint
            watchexec
            miniserve

            rust-bin
            rust-analyzer
          ];

          env = {
            RUST_SRC_PATH = "${pkgs.rustPlatform.rustLibSrc}";
          };
        };
      }
    );
}
