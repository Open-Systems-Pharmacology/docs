# MoBi®‌ Reuse of Project Information from Previous Versions

## Reuse of MoBi® 2 projects in MoBi® 3‌
MoBi® 2 projects are not supported any more.

## Conversion of MoBi® 3.1 projects.

Projects created with MoBi® 3.1 are automatically converted when opened.

In MoBi® 3.1 in some cases it was necessary to insert manual conversion factors into formulas, if dimensions with inconsistent base units were used. In the current version such conversion factors are not longer necessary.

{% hint style="warning" %}
If you have inserted such manual conversion factors, you have to eliminate those factors and to rebuild the simulations to get proper simulation results. Please perform the following steps to identify and remove manual conversion factors and to rebuild the simulations.
{% endhint %}

1.  Open the project stored from MoBi® 3.1.

2.  Open the Notifications view, which is autohidden at the bottom by default.

3.  Double click each row with message "Dimension check warning".

	The corresponding formula is opened. Remove any manual conversion factors (mostly powers of 10), if available. Do not remove other factors.

4.  Rebuild each simulation of interest, i.e. build a new simulation with the same building blocks and use the same simulation settings and modifications as in the corresponding old simulation.

5.  Run each new simulation and compare the results. In case of differences check the formulas with "Dimension check warning" again. In case you have to adjust a formula rebuild the simulation again. Otherwise compare carefully the used building blocks, simulation settings and simulation parameter modifications. If you still get different results, please contact our support ([http://forum.open-systems-pharmacology.org/](http://forum.open-systems-pharmacology.org/)).

6.  If you successfully managed to rebuild the simulations with the same results, remove the old simulations from the project. (Due to the conversion factors still contained in those simulations you would produce wrong results running the old simulations with the new version of MoBi.)
