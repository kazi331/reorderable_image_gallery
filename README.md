## Draggable and re-orderable image gallery

This is a simple image gallery that allows you to drag and re-order images. It is built using [React](https://reactjs.org/) and [dnd-kit](https://docs.dndkit.com/).

### Workflow

- The app is initiated with the app with [vitejs](https://vitejs.dev/)
- Used [dnd-kit](https://docs.dndkit.com/) to create the drag and drop functionality

### Installation

- Clone the repo
- Run `pnpm i` to install dependencies
- Run `pnpm dev` to start the app

### Issues I faced and how I resolved them

1. I had to use the `onDragStart` event on single item to resolve z-index issues when dragging an image over another image. This prioritizes the image being dragged over the other images.

2. Dnd-kit restricts single items envocking events on single item.

### Resolve z-index issues

**Solution `Dnd-kit` z-index issues**

Added the following code to the `onDragStart` event to resolve z-index issues when dragging an image over another image. This prioritizes the image being dragged over the other images.

```js
   draggable={true}
   onDragStart={(e) => {
      e.target.style.zIndex = 100;
      const dragging = document.querySelector('.dragging');
      if (dragging) {
         dragging.classList.remove('dragging')
         dragging.style.zIndex = "";
   };
   e.target.classList.add('dragging');
   }}
```

**Solution to `Dnd-kit` event issues**

As dnd-kit doesn't allow to invock events on single items, I used `react-beautiful-dnd` isntead of `dnd-kit` to resolve this issue.

### Issues with `react-beautiful-dnd`

- With latest version of react(react18), `react-beautiful-dnd` giving in error in `strict mode` which prints the error `Unable to find draggable with id: {draggableId} ` in console when dragging an item.

**Solution to react-beautiful-dnd strictmode issues**

This is a known issue with `react-beautiful-dnd` and it is not fixed yet. I found a workaround for this issue in [github](https://github.com/atlassian/react-beautiful-dnd/issues/2399#issuecomment-1175638194) issues. I used `StrictModeDropable` component instead of `Dropable` component to resolve this issue. This component is a custom component made from the `Dropable` component. I added the following code to the `StrictModeDropable` component to resolve this issue.

```js
import { useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
};
```
