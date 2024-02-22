<template>
  <el-dropdown>
    <span class="iconfont icon-menu btn-tool"></span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <i class="iconfont icon-background-f"></i> 背景颜色
        </el-dropdown-item>
        <el-dropdown-item>
          <i class="iconfont icon-marquee"></i> 重置视口
        </el-dropdown-item>
        <el-dropdown-item>
          <i class="iconfont icon-download"></i> 导出图片
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span style="color: red;">
            <i class="iconfont icon-delete"></i>清空画布
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
