#!/usr/bin/env ruby
# frozen_string_literal: true

require "yaml"
require "pathname"

ROOT = Pathname(__dir__).join("..").expand_path
TOC_PATH = ROOT.join("toc.yml")

def rel_from_lang_root(path, lang)
  prefix = "docs/#{lang}/"
  unless path.start_with?(prefix)
    raise "Expected #{path.inspect} to start with #{prefix.inspect}"
  end
  path.delete_prefix(prefix)
end

def sorted_items(items)
  items.sort_by { |item| item.fetch("order") }
end

def render_language_index(toc, lang)
  lines = []
  lines << "# #{toc.fetch("title")} (#{lang.upcase})"
  lines << ""
  lines << (lang == "ko" ? "한국어 가이드 문서입니다." : "This is the English guide set.")
  lines << ""
  lines << "## TOC"

  sorted_items(toc.fetch("items")).each do |item|
    title = item.fetch("title").fetch(lang)
    top_link = if item["index"]
      rel_from_lang_root(item.fetch("index").fetch(lang), lang)
    elsif item["path"]
      rel_from_lang_root(item.fetch("path").fetch(lang), lang)
    else
      nil
    end
    if top_link
      lines << "#{item.fetch("order")}. [#{title}](./#{top_link})"
    else
      lines << "#{item.fetch("order")}. #{title}"
    end

    next unless item["children"]

    sorted_items(item.fetch("children")).each do |child|
      child_title = child.fetch("title").fetch(lang)
      child_link = rel_from_lang_root(child.fetch("path").fetch(lang), lang)
      lines << "   #{child.fetch("order")}. [#{child_title}](./#{child_link})"
    end
  end

  lines << ""
  lines << if lang == "ko"
    "English version: [English docs](../en/README.md)"
  else
    "Korean version: [한국어 문서](../ko/README.md)"
  end
  lines << ""
  lines.join("\n")
end

def render_section_index(item, lang)
  lines = []
  lines << "# #{item.fetch("title").fetch(lang)}"
  lines << ""
  lines << "## TOC"

  sorted_items(item.fetch("children")).each do |child|
    child_title = child.fetch("title").fetch(lang)
    child_link = File.basename(child.fetch("path").fetch(lang))
    lines << "#{child.fetch("order")}. [#{child_title}](./#{child_link})"
  end

  lines << ""
  lines.join("\n")
end

toc = YAML.safe_load(TOC_PATH.read)
languages = toc.fetch("languages")

languages.each do |lang|
  readme_path = ROOT.join("docs", lang, "README.md")
  readme_path.write(render_language_index(toc, lang))

  sorted_items(toc.fetch("items")).each do |item|
    next unless item["children"] && item["index"]

    index_path = ROOT.join(item.fetch("index").fetch(lang))
    index_path.write(render_section_index(item, lang))
  end
end

puts "Rendered TOC indexes for: #{languages.join(", ")}"
