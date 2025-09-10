# Helper run script tuned for RTX 4060 Ti 16GB.
# Usage: Right-click and 'Run with PowerShell' or let Pinokio invoke start.json.

# Activate venv
if (Test-Path ".\.venv\Scripts\Activate.ps1") {
    . .\.venv\Scripts\Activate.ps1
} else {
    Write-Host "Virtualenv not found. Run install first."
    exit 1
}

cd .\YuE\inference

python infer.py `
  --cuda_idx 0 `
  --stage1_model m-a-p/YuE-s1-7B-anneal-en-cot `
  --stage2_model m-a-p/YuE-s2-1B-general `
  --genre_txt ../prompt_egs/genre.txt `
  --lyrics_txt ../prompt_egs/lyrics.txt `
  --run_n_segments 1 `
  --stage2_batch_size 1 `
  --output_dir ..\output `
  --max_new_tokens 1500 `
  --repetition_penalty 1.1 `
  --keep_intermediate `
  --disable_offload_model false