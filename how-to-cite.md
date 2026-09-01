# How to Cite this Manual

When you refer to this manual in a scientific publication, a report, or any other document, please cite it as shown below.

Cite the version of the manual that you actually used. The version number and the publication date of the manual you are reading are given on the [copyright page](copyright.md).

## Plain text

> Open Systems Pharmacology Community. _Open Systems Pharmacology Suite Manual_. Version 13. 2026. [https://docs.open-systems-pharmacology.org/v13](https://docs.open-systems-pharmacology.org/v13)

## BibTeX

<!-- markdown-link-check-disable -->
```bibtex
@Manual{OSPS-Manual-V13,
    title        = "Open Systems Pharmacology Suite Manual",
    author       = "{Open Systems Pharmacology Community}",
    organization = "Open Systems Pharmacology",
    edition      = "Version 13",
    year         = 2026,
    url          = "https://docs.open-systems-pharmacology.org/v13"
}
```
<!-- markdown-link-check-enable -->

The braces around the author name are required. Without them, BibTeX reads "Open Systems Pharmacology" as given names and "Community" as a surname, and renders the author as "O. S. P. Community".

{% hint style="info" %}
If you used a different version of the manual, adjust the citation key, the `edition` and `year` fields, and the version segment of the `url` to match that version. The edition and year are given on the [copyright page](copyright.md) of that version.
{% endhint %}

## Citing the Open Systems Pharmacology Suite

This manual documents how to use the software. It is not a description of the software platform itself, nor of the models it implements. To cite the platform, use [Lippert et al. (2019)](references.md#115) instead of, or in addition to, this manual:

> Lippert J, Burghaus R, Edginton A, et al. Open Systems Pharmacology Community - An Open Access, Open Source, Open Science Approach to Modeling and Simulation in Pharmaceutical Sciences. _CPT Pharmacometrics Syst Pharmacol_. 2019;8(12):878-882.

Publications describing the individual models, methods, and parameters used by the suite are collected in [References](references.md), and are cited from the sections of this manual that rely on them.
