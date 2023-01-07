# This site is served by Netlify via Github
 
# Minimal 11ty Starter

![Image showing the demo website](https://user-images.githubusercontent.com/3286735/100862193-26c1bd00-3493-11eb-8120-61a0d822588b.png)
A *very* minimal [eleventy](https://11ty.io/) starter using [Tailwind CSS](https://tailwindcss.com/) for styling.

It features a smart navigation component that sets active states automatically.

### [Live Demo](https://clever-newton-cbb08a.netlify.app)  

## Getting Started

npm run serve

## How To: Navigation

The top navigation is the only *feature* in this starter and lives in `/src/_includes/components/navigation.njk`.  

It looks for the eleventyNavigation object in pages and adds them to the navigation bar. It also checks whether the site's url is in the currently opened url and highlights the navigation item accordingly. This even works for subpages. So if you're on `/blog/post/` the **Blog** nav item will still be active.


### Adding links to the navigation
Add the `eleventyNavigation` object to any page and it will appear in the navigation. Optionally set the order of your items.
Check the [11ty docs](https://www.11ty.dev/docs/plugins/navigation/) for more information about the navigation plugin.

```
---
eleventyNavigation:
  key: Your Page Name
  order: 1
---
```


### Changing the navigation item styles
The script in `/_includes/components/navigation.njk` checks if a navigation item is active and styles it accordingly.
Let's dissect the code:

```
<a
 href="{{ entry.url }}"

 // Base styles for navigation items
 class="py-1 px-2 rounded mr-4 inline-block

 // Styles for the active navigation item
 {{'bg-white text-black' if entry.url in page.url

 // Styles for default navigation item
 else 'text-gray-400 hover:text-gray-100'}}">
 {{ entry.title }}
</a>
```



## How To: Blog

Add a page in `_src/blog/posts` and it will appear in the post list.

## Images

Put your images into `_src/img` and add them to your markup like so:
```
<img src="/img/example-image.jpg">
```



## Credits

[Bryan L. Robinson](https://bryanlrobinson.com/blog/using-nunjucks-if-expressions-to-create-an-active-navigation-state-in-11ty/) for explaining how to create the active navigation state

 https://statickit.com/guides/eleventy-tailwind - I set up the project according to this guide

 https://11ty.io/

 https://tailwindcss.com/
