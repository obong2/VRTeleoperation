﻿Shader "Theta/Sphere2" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
		_AlphaBlendTex ("Alpha Blend (RGBA)", 2D) = "white" {}
<<<<<<< HEAD
		_OffsetU ("Offset U", Range(-0.5, 0.5)) = 0 
		_OffsetV ("Offset V", Range(-0.5, 0.5)) = 0
		_ScaleU ("Scale U", Range(0.8, 1.2)) = 1
		_ScaleV ("Scale V", Range(0.8, 1.2)) = 1
		_ScaleCenterU ("Scale Center U", Range(0.0, 1.0)) = 0 
		_ScaleCenterV ("Scale Center V", Range(0.0, 1.0)) = 0
=======
		_OffsetU ("Offset U", Range(-0.5, 0.5)) = -0.01 
		_OffsetV ("Offset V", Range(-0.5, 0.5)) = -0.031
		_ScaleU ("Scale U", Range(0.8, 1.2)) = 0.976
		_ScaleV ("Scale V", Range(0.8, 1.2)) = 0.958
		_ScaleCenterU ("Scale Center U", Range(0.0, 1.0)) = 0.26 
		_ScaleCenterV ("Scale Center V", Range(0.0, 1.0)) = 0.55
>>>>>>> parent of 2994eea... Update UI control on unity
	}
	SubShader {
		Tags { "RenderType" = "Transparent" "Queue" = "Background+1" }
		UsePass "Theta/Sphere1/BASE"
	}
}