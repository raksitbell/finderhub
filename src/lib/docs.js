import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "docs");

export function getDocs() {
  // Get file names under /docs
  const fileNames = fs.readdirSync(docsDirectory);

  const allDocsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(docsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        fileName,
        ...matterResult.data,
        // If no title in frontmatter, use filename
        title:
          matterResult.data.title ||
          fileName.replace(/\.md$/, "").replace(/-/g, " "),
        // Snippet from content (first 200 chars)
        snippet:
          matterResult.content.slice(0, 200).replace(/[#*`]/g, "") + "...",
      };
    });

  return allDocsData;
}

export function getDocBySlug(slug) {
  const fullPath = path.join(docsDirectory, `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      content: matterResult.content,
      ...matterResult.data,
      title: matterResult.data.title || slug.replace(/-/g, " "),
    };
  } catch (err) {
    return null;
  }
}
