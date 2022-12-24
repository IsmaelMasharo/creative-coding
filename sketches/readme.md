# Notes

### Resolution independent shapes
Using canvas size (width, height) as shape dimensions.  
Another option is to specify the specific units that one will be working with and use plain numbers as the dimensions.

### Basics

**Some canvas settings**

```js
const settings = {
  // dimensions: [ 2048, 2048 ]
  dimensions: 'A4',
  units: 'cm',
  orientation: 'landscape',
  pixelsPerInch: 300
};

const sketch = () => {
  return ({ context, width, height }) => {
    // this will print in settingg units dimensions
    console.log(width, height)

    context.fillStyle = 'green';
    context.fillRect(0, 0, width, height);
  };
};
```