# Revisions for 2d-cellular-automata

## Ways to improve automata given more time
1. Refactoring the logic determining neighbor positions
    - This part of the code seemed to deserve the most attention,
    but also seemed the most time intensive to refactor properly.
    - What I would have liked to do is identify the core patterns for recognizing positions and localizing them into their own array to be looped over. The end result would be just offloading the verbose condition logic, perhaps utilizing another function, making them simpler to read.
2. Adding setInterval() functionality, and allowing the user to set a target generation and let it cycle automatically
    - Allow user to also set what that time interval is, in ms.
3. Make table more visually robust, perhaps adding a left panel with various config options such as setting the size of the x and y, starting with randomized data, or inputting your own data.
4. Adding tests for the more advanced functionality and making other UI/UX friendly improvements both visually and with the logic