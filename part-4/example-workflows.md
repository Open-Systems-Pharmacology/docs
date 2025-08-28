# MoBi - Exmple Workflows

The following workflows illustrate how to use MoBi in different scenarios.

## Modularization use case - adding a tumor to a PBPK model

This workflow illustrates how to add a tumor compartment to a PBPK model in MoBi. The steps are as follows:

- Export a simulation from PK-Sim to MoBi. This will create a PK-Sim module.

    ![Image](../assets/images/part-4-example-tumor/fig-01.png)

- Open the spatial structure of the PK-Sim module, select a tissue organ (e.g., muscle), and export it to pkml, e.g. as "**Muscle.pkml**".

    ![Image](../assets/images/part-4-example-tumor/fig-02.png)

- Optionally, select an individual and expression profile(s) to include in the exported organ.

    ![Image](../assets/images/part-4-example-tumor/fig-03.png)

- Create a new "Tumor" extension module with the "Spatial Structure" and "Initial Conditions" building blocks.

    ![Image](../assets/images/part-4-example-tumor/fig-04.png) 

    ![Image](../assets/images/part-4-example-tumor/fig-05.png)

- In the "Tumor" extension module: open the spatial structure and load the top container from the previously saved file Muscle.pkml.

    {% hint style="note" %}
    Note that the neighborhoods between muscle and arterial/venous blood are also loaded.
    {% endhint %}

    ![Image](../assets/images/part-4-example-tumor/fig-06.png)
    
    ![Image](../assets/images/part-4-example-tumor/fig-07.png)

- Rename the "Muscle" container to "Tumor". **Be sure to check the "Rename Related Entities" checkbox in the next dialog!**.

    ![Image](../assets/images/part-4-example-tumor/fig-08.png)

    ![Image](../assets/images/part-4-example-tumor/fig-09.png)

    {% hint style="note" %}
    After renaming, the neighborhoods have been renamed accordingly.
    {% endhint %}

    ![Image](../assets/images/part-4-example-tumor/fig-10.png)

- Open the Initial Conditions building block of the Tumor module and click on "Extend".

    ![Image](../assets/images/part-4-example-tumor/fig-11.png)

- Select molecules to be incorporated into the tumor.

    ![Image](../assets/images/part-4-example-tumor/fig-12.png)

    ![Image](../assets/images/part-4-example-tumor/fig-13.png)

- Create a new simulation and select both modules (make sure that the PK-Sim module is on top!).

    ![Image](../assets/images/part-4-example-tumor/fig-14.png)

 In the next step, optionally select an Individual and Expression Profile(s).

   ![Image](../assets/images/part-4-example-tumor/fig-15.png)

- The "Tumor" organ will now appear in the simulation.

    ![Image](../assets/images/part-4-example-tumor/fig-16.png)

- Tumor drug concentrations, etc. can now be plotted in the simulation.

    ![Image](../assets/images/part-4-example-tumor/fig-17.png)
    
    ![Image](../assets/images/part-4-example-tumor/fig-18.png)