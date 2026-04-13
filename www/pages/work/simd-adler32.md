---
title: simd-adler32
---

## simd-adler32

A fast, SIMD-accelerated implementation of the
[Adler-32](https://en.wikipedia.org/wiki/Adler-32) checksum algorithm, written
in Rust.

- [crates.io](https://crates.io/crates/simd-adler32)
- [github](https://github.com/mcountryman/simd-adler32)

## features

- Zero dependencies
- `no_std` support
- Runtime CPU feature detection with automatic scalar fallback
- Throughput up to ~46 GiB/s on modern hardware

## architecture support

- `x86_64` - avx-512, avx2, ssse3, sse2
- `aarc64` - neon
- `wasm32` - simd128

## safety

The library uses `unsafe` Rust for SIMD intrinsics. All unsafe paths are
validated through AFL fuzzing.
