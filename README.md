Randon User Page Generator

This project uses MVU architecture. One of the main benefits of this architecture is unidirectional data flow.
Instead of a Controller being responsible for both the model and view, here we have the following:

View -> Update -> Model --> 

View <- Update <- New Model

Dependencies:
The Model knows nothing but itself.
The Update know only the Model, and has functions to apply to it.
The View only knows the Update, and how to render its return value.

Data Flow:
The Client interacts with the View through event handlers (buttons).
Each event calls an Update function.
The function is applied to the Model, and returns the new Model.
Finally, the View rerenders the Model (if necessary).

This way we guarentee that any change to the Model will be presented to the client.
