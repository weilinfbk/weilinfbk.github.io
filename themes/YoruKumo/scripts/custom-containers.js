// 1. 处理 ::: 提示框 (渲染前)
hexo.extend.filter.register('before_post_render', function(data) {
  const containerRegex = /^:::\s*(\w+)\s*([\s\S]*?)^:::\s*$/gm;
  data.content = data.content.replace(containerRegex, function(match, type, content) {
    const types = {
      note: { icon: 'ℹ️', color: '#3b82f6' },
      tip: { icon: '💡', color: '#10b981' },
      important: { icon: '📌', color: '#8b5cf6' },
      warning: { icon: '⚠️', color: '#f59e0b' },
      caution: { icon: '🚫', color: '#ef4444' },
      danger: { icon: '❌', color: '#ef4444' }
    };
    let t = types[type.toLowerCase()] || types.note;
    return `<div style="border-left: 4px solid ${t.color}; padding-left: 15px; margin: 20px 0;">
      <div style="color: ${t.color}; font-weight: bold; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 1.2em;">${t.icon}</span> ${type.toUpperCase()}
      </div>
      <div>${content.trim()}</div>
    </div>`;
  });
  return data;
});

// 2. 处理 == 高亮 == (渲染后强行替换)
hexo.extend.filter.register('after_post_render', function(data) {
  if (!data.content) return data;
  
  let content = data.content;
  
  // 第一步：先把代码块 (<pre> 和 <code>) 藏起来，防止把代码里的 == 也高亮了
  const codeBlocks = [];
  content = content.replace(/<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>/g, function(match) {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // 第二步：暴力替换 ==文字== 为高亮标签
  const highlightRegex = /==([^=]+)==/g;
  content = content.replace(highlightRegex, '<mark>$1</mark>');

  // 第三步：把刚才藏起来的代码块放回去
  content = content.replace(/__CODE_BLOCK_(\d+)__/g, function(match, index) {
    return codeBlocks[index];
  });

  data.content = content;
  return data;
});