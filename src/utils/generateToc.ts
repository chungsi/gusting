/**
 * Taken from Astro Docs source code
 * https://github.com/withastro/docs/blob/882e0b0a9d16d1c822cb8c230a62a4bfcd308605/src/util/generateToc.ts
 */
import type { MarkdownHeading } from 'astro'

export interface TocItem extends MarkdownHeading {
	children: TocItem[];
}

function diveChildren(item: TocItem, depth: number): TocItem[] {
	if (depth === 1) {
		return item.children;
	} else {
		// e.g., 2
		return diveChildren(item.children[item.children.length - 1], depth - 1);
	}
}

export default function generateToc(
  headings: MarkdownHeading[],
  // title = 'Overview'
) {
  // Personal Note: Except I don't need the default "Overview" to go to the top of the page
	// const overview = { depth: 2, slug: 'overview', text: title };
	// headings = [overview, ...headings.filter(({ depth }) => depth > 1 && depth < 4)];
	headings = [...headings.filter(({ depth }) => depth > 1 && depth < 4)];
	const toc: Array<TocItem> = [];

	for (const heading of headings) {
		if (toc.length === 0) {
			toc.push({
				...heading,
				children: [],
			});
		} else {
			const lastItemInToc = toc[toc.length - 1];
			if (heading.depth < lastItemInToc.depth) {
				throw new Error(`Orphan heading found: ${heading.text}.`);
			}
			if (heading.depth === lastItemInToc.depth) {
				// same depth
				toc.push({
					...heading,
					children: [],
				});
			} else {
				// higher depth
				// push into children, or children' children alike
				const gap = heading.depth - lastItemInToc.depth;
				const target = diveChildren(lastItemInToc, gap);
				target.push({
					...heading,
					children: [],
				});
			}
		}
	}
	return toc;
}

/**
 * Or can use this from another article
 * https://kld.dev/building-table-of-contents/
 */
// function buildToc(headings) {
//   const toc = [];
//   const parentHeadings = new Map();
//   headings.forEach((h) => {
//     const heading = { ...h, children: [] };
//     parentHeadings.set(heading.depth, heading);
//     // Change 2 to 1 if your markdown includes your <h1>
//     if (heading.depth === 2) {
//       toc.push(heading);
//     } else {
//       parentHeadings.get(heading.depth - 1).children.push(heading);
//     }
//   });
//   return toc;
// }