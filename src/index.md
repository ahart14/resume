---
title: 11ty template
summary: This is the home page summary
layout: base.njk
---
<div class="content">
  <div class="content-measure">
    <div class="content-block">
      <div class="content-block1">
        <h2>Content section</h2>
        <p>Add supporting content here.</p>
        <p><a href="/">Link to details</a></p>
      </div>
      <div class="content-block2">
        <div class="image image--small">
          <figure>
            <img src="https://dummyimage.com/800x360/f1f1f1/aaa" alt="" width="100%">
            <figcaption>Image caption</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</div>
{% include 'partials/card.njk' %}
<div class="content">
<div class="content-measure">
<div class="content-block">
<div class="content-block1">
<h2>Posts</h2>
<p>Add supporting content here.</p>
</div>
<div class="content-block2">
{% for post in collections.posts %}
<div class="publication">
<h3 class="publication-title">
<a href="{{ post.url }}">{{ post.data.title }}</a>
</h3>
<p class="publication-meta">{{ post.data.summary }}</p>
</div>
{% endfor %}
</div>
</div>
</div>
</div>