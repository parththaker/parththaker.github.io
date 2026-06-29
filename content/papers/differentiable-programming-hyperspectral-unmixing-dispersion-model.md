---
title: >-
  Differentiable Programming for Hyperspectral Unmixing using a Physics-based
  Dispersion Model
authors: 'J Janiczek, P Thaker, G Dasarathy, C S Edwards, P Christensen, S Jayasuriya'
date: '2020-08-01'
arxivId: '2007.05996'
venue: ECCV 2020
tags:
  - Computer Vision
  - Hyperspectral Imaging
  - Differentiable Programming
  - Physics-based Models
  - Remote Sensing
abstract: >-
  Hyperspectral unmixing is an important remote sensing task with applications
  including material identification and analysis. Characteristic spectral
  features make many pure materials identifiable from their visible-to-infrared
  spectra, but quantifying their presence within a mixture is a challenging task
  due to nonlinearities and factors of variation. We consider spectral variation
  from a physics-based approach and incorporate it into an end-to-end spectral
  unmixing algorithm via differentiable programming. The dispersion model is
  introduced to simulate realistic spectral variation, and an efficient method
  to fit the parameters is presented. This dispersion model is utilized as a
  generative model within an analysis-by-synthesis spectral unmixing algorithm.
  Additionally, we present a technique for inverse rendering using a
  convolutional neural network to predict parameters of the generative model to
  enhance performance and speed when training data is available. Results achieve
  state-of-the-art on both infrared and visible-to-near-infrared (VNIR)
  datasets, and show promise for the synergy between physics-based models and
  deep learning in hyperspectral unmixing.
insight: >-
  Most unmixing methods lean on a linear mixing assumption that breaks down once
  you account for real spectral variability. We instead made a physics-based
  dispersion model differentiable and used it as the generative component in an
  analysis-by-synthesis loop, so abundances and physical parameters are fit
  jointly via gradient descent. The CNN that predicts dispersion parameters is
  mainly there to cut inference cost when training data is available.
oneLiner: >-
  Makes a physics-based optical dispersion model differentiable and uses it for
  end-to-end hyperspectral unmixing, jointly estimating material abundances and
  physical parameters.
codeUrl: 'https://github.com/johnjaniczek/InfraRender'
blog: differentiable-physics-for-hyperspectral-unmixing
---

