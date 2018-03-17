# Various notes

## CSS

### display block vs flex

![display: block](#)

```
.flex-card-box {
  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  background: white;
  padding: var(--default-margin);
  flex-wrap: wrap;
}
```

![display: flex](#)

```
.flex-card-box {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  background: white;
  padding: var(--default-margin);
  flex-wrap: wrap;
}
```