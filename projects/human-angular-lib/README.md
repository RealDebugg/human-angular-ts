# human-angular-lib

Puts a lil guy on the webpage that follows the cursor :)

(For Angular v21.x)

## Example

app.html:

```html
<app-human></app-human>
```

app.ts:

```ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HumanComponent } from 'human-angular-lib';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HumanComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
```

There's not much more to this project, I recommend adding it to the root of your project like the main app.ts/html file so that the guy can run around on all of your pages :)

## Credits

- Assets are from [AxulArt on itch.io](https://axulart.itch.io/small-8-direction-characters)
- Original code base from [RealDebugg on Github](https://github.com/RealDebugg)
- Movement logic from [adryd325 on Github](https://github.com/adryd325/oneko.js/blob/main/oneko.js)
