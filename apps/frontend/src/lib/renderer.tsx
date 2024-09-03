import React, { Fragment } from "react";
import escapeHTML from "escape-html";
import { Text } from "slate";

import { BlogPost } from "@/lib/blogs";

type Children = BlogPost["content"];

export const serialize = (children: Children) =>
  children.map((node, i) => {
    if (Text.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      if (node.text === "") {
        text = <br />;
      }

      // Handle other leaf types here...

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "h1":
        return <h1 key={i}>{serialize(node.children as Children)}</h1>;
      case "h2":
        return <h2 key={i}>{serialize(node.children as Children)}</h2>;
      case "h3":
        return <h3 key={i}>{serialize(node.children as Children)}</h3>;
      case "h4":
        return <h4 key={i}>{serialize(node.children as Children)}</h4>;
      case "h5":
        return <h5 key={i}>{serialize(node.children as Children)}</h5>;
      case "h6":
        return <h6 key={i}>{serialize(node.children as Children)}</h6>;
      case "blockquote":
        return (
          <blockquote key={i}>
            {serialize(node.children as Children)}
          </blockquote>
        );
      case "ul":
        return <ul key={i}>{serialize(node.children as Children)}</ul>;
      case "ol":
        return <ol key={i}>{serialize(node.children as Children)}</ol>;
      case "li":
        return <li key={i}>{serialize(node.children as Children)}</li>;
      case "link":
        return (
          <a href={escapeHTML(node.url as string)} key={i}>
            {serialize(node.children as Children)}
          </a>
        );

      default:
        return <p key={i}>{serialize(node.children as Children)}</p>;
    }
  });
