# Documentation

While PBPK modelling is applied to inform decision making in the pharmaceutical industry to e.g. inform go/no-go decisions, formulation development, a dosing strategy in pediatrics or a DDI strategy one should keep in mind that PBPK modelling is a robust tool to support drug/chemical safety or toxicity risk assessment in general.

Independent of whether PBPK modelling is used for internal decision making or for decisions by regulators, a minimum level of documentation is recommended to facilitate traceability and, later on, review by regulators. This minimum level of documentation should allow for establishing the link between data, data transformations and manipulation, final model/simulation code, and conclusions in order to facilitate traceability. The manuscript “Good practices in model-informed drug discovery and Development (MID3): Practice, Application and Documentation” (Marshall et al. 2016) provides an overview on different levels of documentation (memo, report), a suggestion for documentation of analysis plans and reports including high-level guidance for authors with respect to content and audience. Guidance on documentation of assumptions and assessment of assumptions during model development is also provided . A recent publication by Tan et al. focuses on PBPK model reporting for chemical risk assessment, expanding the already existing guidances for pharmaceutical applications by recommending additional elements that are relevant to environmental chemicals, providing a more general and harmonized framework for reporting of PBPK models (Tan et al. 2020).

## Documentation during the conduct of an analysis
It is recommended to create a summary of the parameter identification steps describing all relevant steps and tested models leading to the current best model. It is recommended to capture the following information: 
- Analysis dataset used for parameter identification 
- Simulations included  
- Rationale for the model / hypothesis tested  
- Outcome/evaluation of the parameter identification step 
- Parameters used in final model
  
Most of the commercial PBPK software offer a built-in tracking of parameter identification steps such as e.g. the journal function in OSP.

## Reporting (including analysis plans) of PBPK analysis
FDA and EMA have both issued guidance documents for the industry on reporting of PBPK analysis outlining the recommended format and content of a report for regulatory submissions (FDA 2019; EMA 2018). The EMA guidance clarifies their expectation on qualifying a PBPK platform for the intended use. 

A more detailed overview on sections to be included in such a report and guidance on expected content in each section is provided in Table 4 of a review on “Physiologically Based Pharmacokinetic Model Qualification and Reporting Procedures for Regulatory Submissions: A Consortium Perspective” by (Shebley et al. 2018). The outlined sections are in line with the MID3 recommendations and the FDA guideline. Supplements to this publication include a template for analysis plans and reports. 

A more recent publication (Tan et al. 2020) focuses on PBPK model reporting for chemical risk assessment applications. It expands the existing guidances (EMA, FDA, Shebley) for pharmaceutical applications to support the assessment of the safety of environmental chemicals. The publication provides very detailed expectations towards the content of each section which go beyond the level of detail as provided by the existing guidelines. While Tan et al. address underlying modelling assumptions as part of the method section, Marshall et al. and Shebley et al. suggest a stand-alone section including documentation of assessing the impact of uncertainties in the assumptions taken.

## References
- EMA. 2018. “Guideline on the Qualification and Reporting of Physiologically Based Pharmacokinetic (PBPK) Modelling and Simulation.” 2018. https://www.ema.europa.eu/en/documents/scientific-guideline/guideline-reporting-physiologically-based-pharmacokinetic-pbpk-modelling-simulation_en.pdf.
- FDA, Center for Drug Evaluation and. 2019. “Physiologically Based Pharmacokinetic Analyses — Format and Content Guidance for Industry.” U.S. Food and Drug Administration. October 18, 2019. http://www.fda.gov/regulatory-information/search-fda-guidance-documents/physiologically-based-pharmacokinetic-analyses-format-and-content-guidance-industry.
- Marshall, S. F., R. Burghaus, V. Cosson, S. Y. A. Cheung, M. Chenel, O. DellaPasqua, N. Frey, et al. 2016. “Good Practices in Model-Informed Drug Discovery and Development: Practice, Application, and Documentation.” CPT: Pharmacometrics & Systems Pharmacology 5 (3): 93–122. https://doi.org/10.1002/psp4.12049.
- Shebley, Mohamad, Punam Sandhu, Arian Emami Riedmaier, Masoud Jamei, Rangaraj Narayanan, Aarti Patel, Sheila Annie Peters, et al. 2018. “Physiologically Based Pharmacokinetic Model Qualification and Reporting Procedures for Regulatory Submissions: A Consortium Perspective.” Clinical Pharmacology and Therapeutics 104 (1): 88–110. https://doi.org/10.1002/cpt.1013.
- Tan, Yu-Mei, Melissa Chan, Amechi Chukwudebe, Jeanne Domoradzki, Jeffrey Fisher, C. Eric Hack, Paul Hinderliter, et al. 2020. “PBPK Model Reporting Template for Chemical Risk Assessment Applications.” Regulatory Toxicology and Pharmacology 115 (August): 104691. https://doi.org/10.1016/j.yrtph.2020.104691.

1. Marshall et al., https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4809625/
1. Tan et al., https://www.sciencedirect.com/science/article/pii/S0273230020301173 
1. FDA guideline, https://www.fda.gov/media/101469/download
1. EMA guideline, https://www.ema.europa.eu/en/documents/scientific-guideline/guideline-reporting-physiologically-based-pharmacokinetic-pbpk-modelling-simulation_en.pdf
1. Shebley et al, Table 4, https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6032820/
