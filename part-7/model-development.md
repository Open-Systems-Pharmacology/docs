# Model Development

Prior to starting on model development, a requirements analysis should be conducted to assess and outline a model development strategy:
-	the model purpose, i.e. its context of use which should include
-	Organism / population characteristics (biometrics, genotype, disease state, …) and the 
-	Experimental design
-	the observed data  (e.g., QSA/PR, in-vitro, or in-vivo) available for model development
-	Non-clinical & clinical data considerations, e.g., would it help the model development of a human PBPK model to develop an animal PBPK model (e.g. for FIM or if no IV data was collected in humans but in animals)?
-	Individuals data vs population mean data: how will this impact model evaluation and qualification (variability and uncertainty assessments (Considered in Sections “3. Model Evaluation” and “4. Model Applications”)))
-	and the model evaluation & qualification strategy (Section “Model Evaluation”)

This requirements analysis should then be condensed into specifications (i.e., a strategy) for model development & qualification and documented within an analysis plan (see Figure1).

FIGURE - RM
Figure 1: Predict, Learn, and Confirm cycle in IVIVE-PBPK model development (adopted from (Kuepfer et al. 2016)).   

Availability and quality of data for model development is the key element and has to be judged in the context of use (see “Useful Literature” below). 

**As an example:** data quality, e.g. input parameters for compound PK properties such as fraction unbound in plasma (fup) may have been precisely measured or only predicted with some uncertainty through QSPR models. The latter might contain too much uncertainty and not be appropriate in the context of precision dosing estimates for a clinical trial, but might well be suitable for risk assessment in environmental toxicology.

Thus, the key is to make yourself aware of the limitations of the available data considering:
-  accuracy and suitability of data for PBPK model development. 
-  in which systems the data have been collected 
   -  fu or lipophilicity measures (partitioning media used, neutral or acid/base compound)
   -  solubility (measured in water or biorelevant media)
   -  dissolution profiles (what apparatus was used and at which pH values).

What should not be neglected in the requirements analysis, is the evaluation of the information, data and structure which the PBPK framework and associated databases or “add-on modules” contain. Compound properties and context of use will require decisions and sound qualification on what to select from available options, e.g.: 
- which partitioning calculation method to choose based on compound properties 
- how to extend the model (with e.g. “add-on modules” found in modeling literature) if required to fulfill its purpose (i.e., customizing default model equations and structure to account for e.g. specific mechanisms of distribution or new organ compartments not covered by the default PBPK model structure).

## Useful Literature
- IVIVE / ADME (Miller et al. 2019)
  -  This best practice provides an overview of strategies for first in human prediction based on preclinical modelling. A Review of relevant scientific publications and case examples are provided as well.
- Absorption (Cho et al. 2014) 
  - This review provides an overview of the determinants of intestinal absorption and first-pass elimination of drugs and focuses on the principles and applications of conventional in vitro–in vivo extrapolation (IVIVE) methods to predict Fabs, FG, and FH in humans.
- Distribution (Patrick Poulin et al. 2011; Berezhkovskiy 2004; P. Poulin and Theil 2000; Rodgers, Leahy, and Rowland 2005)
  - These papers provide the state of art of mechanistic calculation of steady state tissue:plasma partition coefficients (Kt:p) of organic chemicals in mammalian species was developed.
- Metabolism (Benet and Sodhi 2020)
  - Benet and Sodhi proposed future pathways that should be investigated in terms of the relationship to experimentally measured clearance values, rather than model-dependent intrinsic clearance
- Transporters & Excretion (Kumar et al. 2018; Mallick 2017; Trapa et al. 2019)
  - These data demonstrate the promise of using IVIVE of transporter-mediated drug clearance and highlight the importance of quantifying plasma membrane expression of transporters and utilizing cells that mimic the in vivo mechanism(s) of transport of drugs.
- Data-driven model refinement and qualification (Add Referencese.g. Peters and Dolgos 2019)
- PD Model?
  - Points to consider for target engagement/RO (add reference) and linking PBPK into QSP (add reference)
- Benet, Leslie Z., and Jasleen K. Sodhi. 2020. “Investigating the Theoretical Basis for In Vitro–In Vivo Extrapolation (IVIVE) in Predicting Drug Metabolic Clearance and Proposing Future Experimental Pathways.” The AAPS Journal 22 (5): 120. https://doi.org/10.1208/s12248-020-00501-9.
- Berezhkovskiy, Leonid M. 2004. “Volume of Distribution at Steady State for a Linear Pharmacokinetic System with Peripheral Elimination.” Journal of Pharmaceutical Sciences 93 (6): 1628–40. https://doi.org/10.1002/jps.20073.
Cho, Hyun-Jong, Ji-Eon Kim, Dae-Duk Kim, and In-Soo Yoon. 2014. “In Vitro-in Vivo Extrapolation (IVIVE) for Predicting Human Intestinal Absorption and First-Pass Elimination of Drugs: Principles and Applications.” Drug Development and Industrial Pharmacy 40 (8): 989–98. https://doi.org/10.3109/03639045.2013.831439.
- Kuepfer, L, C Niederalt, T Wendl, J-F Schlender, S Willmann, J Lippert, M Block, T Eissing, and D Teutonico. 2016. “Applied Concepts in PBPK Modeling: How to Build a PBPK/PD Model: Applied Concepts in PBPK Modeling.” CPT: Pharmacometrics & Systems Pharmacology 5 (10): 516–31. https://doi.org/10.1002/psp4.12134.
- Kumar, Vineet, Jia Yin, Sarah Billington, Bhagwat Prasad, Colin D. A. Brown, Joanne Wang, and Jashvant D. Unadkat. 2018. “The Importance of Incorporating OCT2 Plasma Membrane Expression and Membrane Potential in IVIVE of Metformin Renal Secretory Clearance.” Drug Metabolism and Disposition: The Biological Fate of Chemicals 46 (10): 1441–45. https://doi.org/10.1124/dmd.118.082313.
- Mallick, Pankajini. 2017. “Utilizing in Vitro Transporter Data in IVIVE-PBPK: An Overview,” 11.
- Miller, Neil A., Micaela B. Reddy, Aki T. Heikkinen, Viera Lukacova, and Neil Parrott. 2019. “Physiologically Based Pharmacokinetic Modelling for First-In-Human Predictions: An Updated Model Building Strategy Illustrated with Challenging Industry Case Studies.” Clinical Pharmacokinetics, February. https://doi.org/10.1007/s40262-019-00741-9.
- Peters and Dolgos. Requirements to Establishing Confidence in Physiologically Based Pharmacokinetic (PBPK) Models and Overcoming Some of the Challenges to Meeting Them. https://doi.org/10.1007/s40262-019-00790-0

- Poulin, P., and F. P. Theil. 2000. “A Priori Prediction of Tissue:Plasma Partition Coefficients of Drugs to Facilitate the Use of Physiologically-Based Pharmacokinetic Models in Drug Discovery.” Journal of Pharmaceutical Sciences 89 (1): 16–35. https://doi.org/10.1002/(SICI)1520-6017(200001)89:1<16::AID-JPS3>3.0.CO;2-E.
- Poulin, Patrick, Hannah M. Jones, Rhys Do Jones, James W.T. Yates, Christopher R. Gibson, Jenny Y. Chien, Barbara J. Ring, et al. 2011. “PhRMA CPCDC Initiative on Predictive Models of Human Pharmacokinetics, Part 1: Goals, Properties of the Phrma Dataset, and Comparison with Literature Datasets.” Journal of Pharmaceutical Sciences 100 (10): 4050–73. https://doi.org/10.1002/jps.22554.
- Rodgers, Trudy, David Leahy, and Malcolm Rowland. 2005. “Physiologically Based Pharmacokinetic Modeling 1: Predicting the Tissue Distribution of Moderate-to-Strong Bases.” Journal of Pharmaceutical Sciences 94 (6): 1259–76. https://doi.org/10.1002/jps.20322.
- Trapa, Patrick E., Matthew D. Troutman, Thomas Y. Lau, Travis T. Wager, Tristan S. Maurer, Nandini C. Patel, Mark A. West, et al. 2019. “In Vitro–In Vivo Extrapolation of Key Transporter Activity at the Blood–Brain Barrier.” Drug Metabolism and Disposition 47 (4): 405–11. https://doi.org/10.1124/dmd.118.083279.

