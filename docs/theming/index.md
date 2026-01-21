# Theming and Styling the BBjWebComponents

## Styling Parts in the Shadow Dom

BBj Controls are implemented as WebComponents. The advantage of that concept is that they are implemented in a self-contained fashion. Typically an application developer does not need to manipulate its inner components directly as BBj implements theming, and offers a Theme editor to adjust the theme to your liking.

BBj offers certain API methods that are fully implemented in DWC. For instance, in order to change the background color of a BBjButton, you can use:

```bbj
myButton!.setBackColor(BBjAPI().makeColor("YELLOW"))
```

In one of the prior sections you also learned about:

```bbj
myButton!.setAttribute("theme","success")
```

which also has an impact on its color. But how to apply CSS directly to the inner elements of the BBjButton?

<iframe width="560" height="315" src="https://www.youtube.com/embed/9HQBN-PVHWs" title="Styling Parts in the Shadow Dom" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The solution is the `::part` selector in CSS. In combination with the documented shadow parts for the BBjButton the CSS part to set the background color of the BBjButton will become:

```css
.yellow-bbj-button::part(control) {
    background-color: yellow;
}
```

## Switching your BBj App to Dark Theme

BBj comes with a built-in theme, that offers a Dark-Mode. Switching to Dark Mode is documented with the Webcomponents and turns out to be pretty simple:

```bbj
window!.setAttribute("@app-theme","dark")
```

switches to dark mode.

With that knowledge, we can improve our HelloButton program by adding a Toggle-Checkbox to switch on Dark-Mode.

```bbj
wnd! = BBjAPI().openSysGui("X0").addWindow(10,10,800,600,"Hello BBj DWC",$01101083$)
wnd!.setCallback(BBjAPI.ON_CLOSE,"byebye")
wnd!.setStyle("margin","20px")
wnd!.setPanelStyle("display","inline-grid")
wnd!.setPanelStyle("gap","20px")

cb! = wnd!.addCheckBox(wnd!.getAvailableControlID(),0,0,0,0,"Dark Theme")
cb!.setCallback(BBjAPI.ON_CHECK_OFF,"toggleLightTheme")
cb!.setCallback(BBjAPI.ON_CHECK_ON,"toggleDarkTheme")

btn! = wnd!.addButton(wnd!.getAvailableControlID(),0,0,0,0,"Say Hello")
btn!.setCallback(BBjAPI.ON_BUTTON_PUSH,"sayhello")

process_events

sayhello:
    a=msgbox("Hello World")
return

toggleLightTheme:
    wnd!.setAttribute("@app-theme","light")
return

toggleDarkTheme:
    wnd!.setAttribute("@app-theme","dark")
return
```

Copy the code into your IDE and run it in DWC. Examine what happens when you switch to Dark-Mode.

## Use the DWC Theme Editor to create your own Theme

:::note Temporary Chapter
This will soon change - the Theme Editor is currently available here: [https://hot.bbx.kitchen/webapp/DWCThemeEditor](https://hot.bbx.kitchen/webapp/DWCThemeEditor)

It will soon be shipped with BBj, then this chapter will be revised.
:::

It allows you to change many of the variables that are combined to be the BBj Theme. Download the Theme CSS file and add it to your code.

## Reference Manual on Theming

The documentation pages for the webcomponents contain a comprehensive reference manual that explain the various theming options from the ground up. With the exercises you just did, you are probably able to work through it:

[https://basishub.github.io/basis-next/#/theme-engine/](https://basishub.github.io/basis-next/#/theme-engine/)
