# YuE for Pinokio (Windows, tuned for RTX 4060 Ti 16GB)

This package contains Pinokio app files to install and run [`sdbds/YuE-for-windows`](https://github.com/sdbds/YuE-for-windows) on Windows with a single RTX 4060 Ti (16GB).  

## Files
- `install.json` - Install steps (clone, venv, pip install Torch 2.5.1+cu124, requirements-uv.txt)
- `start.json` - Daemon start command tuned for 16GB VRAM
- `reset.json` - Cleanup script
- `pinokio_meta.json` - metadata
- `run-windows.ps1` - helper run script

## Usage
1. Copy this folder under Pinokio `api\\YuE`.
2. In Pinokio UI: run `install.json`.
3. After install, run `start.json`.
4. Outputs appear in `YuE\\output`.

## Requirements
- **Python 3.10 only** (wheel compatibility for flash-attn and torch).
- **NVIDIA driver with CUDA 12.4 support** (latest drivers recommended).
- **Git + Git LFS** must be installed.
- Disk space: tens of GB (models are large).

## Tuning for 16GB VRAM
- `--stage2_batch_size=1` to fit memory.
- `--run_n_segments=1` (increase only if memory allows).
- `--max_new_tokens=1500` to reduce OOM risk.
- If OOM: lower tokens, keep batch=1, try segmented generation.

## Notes
- If `torch` or `flash-attn` fails, ensure Python is 3.10 and reinstall with:
  ```powershell
  .\.venv\Scripts\Activate.ps1
  pip install torch==2.5.1+cu124 torchaudio==2.5.1+cu124 --index-url https://download.pytorch.org/whl/cu124
  pip install -r YuE\requirements-uv.txt
