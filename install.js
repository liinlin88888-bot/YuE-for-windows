module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          // 安装系统依赖
          "conda create -n yue python=3.8 -y",
          "conda activate yue",
          
          // 安装 CUDA 11.8 (如果尚未安装)
          "module load cuda11.8/toolkit/11.8.0 || true",
          "export PATH=/usr/local/cuda-11.8/bin:$PATH",
          "export LD_LIBRARY_PATH=/usr/local/cuda-11.8/lib64:$LD_LIBRARY_PATH",
          
          // 克隆仓库
          "git clone https://github.com/sdbds/YuE-for-windows.git",
          "cd YuE-for-windows",
          
          // 安装 Python 依赖
          "pip install -r requirements.txt",
          
          // 安装 FlashAttention 2
          "pip install flash-attn --no-build-isolation"
        ],
        path: "/",  // 从根目录开始
        venv: "yue"  // 使用创建的 conda 环境
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/m-a-p/YuE-s1-7B-anneal-en-cot/resolve/main/config.json",
        dir: "YuE-for-windows/models"
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/m-a-p/YuE-s2-1B-general/resolve/main/config.json",
        dir: "YuE-for-windows/models"
      }
    },
    {
      method: "notify",
      params: {
        title: "YuE 安装完成",
        text: "现在可以启动音乐生成了"
      }
    }
  ]
}