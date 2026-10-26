---
title: 标签
date: 2026-10-27 12:00:00
---
<div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px;">
<% site.tags.each(function(tag){ %>
  <a href="<%- url_for(tag.path) %>" style="padding: 8px 16px; background: rgba(128,128,128,0.1); border-radius: 8px; text-decoration: none; color: inherit;">
    <%= tag.name %> (<%= tag.length %>)
  </a>
<% }) %>
</div>