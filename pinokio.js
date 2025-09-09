module.exports = {
  title: "YuE 音乐生成器",
  description: "开源全曲生成基础模型",
  icon: "icon.png",  // 需要添加图标文件
  menu: async (kernel) => {
    const installed = await kernel.exists(__dirname, "YuE-for-windows", "env")
    return [
      {
        icon: "fa-solid fa-download",
        text: "安装 YuE",
        href: "install.js",
        show: !installed
      },
      {
        icon: "fa-solid fa-music",
        text: "生成音乐",
        href: "start.js",
        show: installed
      },
      {
        icon: "fa-solid fa-folder-open",
        text: "打开输出目录",
        href: "YuE-for-windows/output",
        show: installed
      }
    ]
  }
}