# Modeling of Proteins

Therapeutic proteins are an increasingly important class of drugs. Particularly, monoclonal antibodies are used for different indications including cancer, inflammatory and autoimmune diseases \[88\]. These engineered antibody fragments with tailored pharmacokinetic properties have the potential to be used as diagnostic and therapeutic agents \[34\].

PK-Sim® offers a model specifically designed to describe the pharmacokinetics of proteins and other macromolecules. The pharmacokinetics of protein therapeutics are governed by a number of unspecific and specific processes, which, have to be incorporated to describe the pharmacokinetics of protein therapeutics. This includes \[42\]:

* Exchange across the vascular endothelium between plasma and interstitial space by convection and diffusion.
* Return of the drug from interstitial space of the organs to circulation by lymph flow.
* Degradation and protection from degradation by neonatal Fc receptor \(FcRn\) in cellular endosomes.
* Target-mediated disposition and clearance.

This model was developed by extending the standard model for small molecules by a description of the transcapillary drug exchange, lymph flows and endosomal space including drug degradation and protection from degradation by the FcRn receptor.

Within this model, the transcapillary exchange of the drug is described by the two-pore formalism \[58\], \[57\], \[3\]. According to this theory, the barrier between plasma and interstitial space is described as a membrane consisting of two types of pores: a few large and many small ones. Macromolecules can pass through these pores by convection as well as diffusion. In order to describe these processes, the endothelial permeabilities and osmotic reflection coefficients of the drug for the different organs are calculated within PK-Sim® from the Stokes radius of the drug and endothelial properties like pore radii and hydraulic conductivity \[58\].

The FcRn sub-model is based on the model published by Garg and Balthasar \[26\]. The fraction of drug that is bound to FcRn within the endosomal space is recycled to plasma and the interstitial space whereas the fraction not bound to FcRn is cleared from the endosomal space. In PK-Sim®, endosomes represent the endosome in the vascular endothelium only and serve as a compartment for the protein. Endogenous IgG is also represented that competes with the drug for the FcRn receptor. The clearance of the drug thus depends on its affinity to the FcRn receptor, the endosomal concentration of endogenous IgG and the endosomal concentration of the FcRn receptor. The main difference to the model published by Garg and Balthasar \[26\] is that in the PK-Sim® model, there is binding to the FcRn receptor which is explicitly represented and, thus, different affinities to the FcRn receptor can be specified for the drug and the endogenous IgG.

Nonspecific binding or specific binding of the therapeutic protein to its target can be added within PK-Sim®. Specific binding within a tumor or a detailed description of target mediated clearance by receptor internalization can be added within MoBi® based on a PK-Sim® protein.

