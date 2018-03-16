## CSS Style Conventions

- Never write global css unless you have a very strong justification for why you need it, but even still, we'll suggest otherwise.
- Write component-specific css while following these [naming conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md#components)

For example:
```
<div className="MyComponent">
  <header class="MyComponent-header">
    <button class="MyComponent-button">
      Foo
    </button>
  </header>
  <div className="MyComponent-bodyText">
    <p className="MyComponent-bodyText--text">
      Lorem ipsum blah blah blah
    </p>
  </div>
</div>
```

#### CSS Ruleset Example

```
// example ruleset

$l: 1360px;

.MyComponent {
  mixin();

  content: "\0000";
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  float: none;
  display: block;
  overflow: hidden;
  width: 60px;
  height: 60px;
  margin: 20px;
  padding: 20px;
  border: 1px solid #000;
  border-radius: 4px;

  background-color: #FFF;
  color: #000;
  font-size: 12px;
  font-weight: 700;
  text-shadow: 0 1px 0 #FFF;

  @media (max-width: $l) {
    margin: 10px;
    padding: 10px;
  }

  > li {
    margin: 5px;
    padding: 5px;
  }
}
```
