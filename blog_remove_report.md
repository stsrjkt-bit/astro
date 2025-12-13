## blog usage report
\n### 1) where blog components are imported from
src/components/widgets/BlogHighlightedPosts.astro:4:import Grid from '~/components/blog/Grid.astro';
src/components/widgets/BlogLatestPosts.astro:4:import Grid from '~/components/blog/Grid.astro';
src/components/blog/Grid.astro:2:import Item from '~/components/blog/GridItem.astro';
src/components/blog/List.astro:2:import Item from '~/components/blog/ListItem.astro';
src/components/blog/ListItem.astro:5:import PostTags from '~/components/blog/Tags.astro';
src/components/blog/SinglePost.astro:5:import PostTags from '~/components/blog/Tags.astro';
\n### 2) are blog widgets referenced outside widgets/ ?
src/components/blog/RelatedPosts.astro:5:import BlogHighlightedPosts from '../widgets/BlogHighlightedPosts.astro';
src/components/blog/RelatedPosts.astro:20:    <BlogHighlightedPosts
\nRESULT: blog widgets are referenced by entry code. Abort deletion.
