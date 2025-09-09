module.exports = {
  daemon: true,  // 保持进程运行
  run: [
    {
      method: "input",
      params: {
        title: "YuE 音乐生成参数",
        description: "输入歌曲风格和歌词",
        fields: [
          { name: "genre", title: "音乐风格", placeholder: "例如: inspiring female uplifting pop" },
          { name: "lyrics", title: "歌词", type: "textarea", placeholder: "按段落输入歌词..." }
        ]
      }
    },
    {
      method: "fs.write",
      params: {
        path: "YuE-for-windows/prompt_egs/genre.txt",
        text: "{{input.genre}}"
      }
    },
    {
      method: "fs.write",
      params: {
        path: "YuE-for-windows/prompt_egs/lyrics.txt",
        text: "{{input.lyrics}}"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "YuE-for-windows",
        message: [
          "cd inference",
          "python infer.py " +
            "--cuda_idx 0 " +
            "--stage1_model m-a-p/YuE-s1-7B-anneal-en-cot " +
            "--stage2_model m-a-p/YuE-s2-1B-general " +
            "--genre_txt ../prompt_egs/genre.txt " +
            "--lyrics_txt ../prompt_egs/lyrics.txt " +
            "--run_n_segments 2 " +
            "--stage2_batch_size 4 " +
            "--output_dir ../output " +
            "--max_new_tokens 3000 " +
            "--repetition_penalty 1.1"
        ],
        venv: "yue",
        on: {
          event: "/Generated audio: (.+\\.mp3)/",  // 检测生成完成的正则
          done: true  // 完成后继续下一步
        }
      }
    },
    {
      method: "notify",
      params: {
        title: "音乐生成完成",
        text: "已保存到输出目录",
        actions: [
          {
            text: "打开输出目录",
            type: "open",
            path: "YuE-for-windows/output"
          }
        ]
      }
    }
  ]
}