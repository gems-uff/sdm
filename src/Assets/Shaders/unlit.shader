Shader "MyShaders/Unlit" {
	Properties {
        _Color ("Main Color", Color) = (1,1,1,1)
        _MainTex ("Base (RGB) Trans. (Alpha)", 2D) = "white" { }
    }
	
	// ------------------------------------------------------------------
	// All cards
	
	SubShader {
		Pass {
			Lighting Off
			SetTexture [_MainTex] {
				constantColor [_Color]
				Combine texture * constant, texture * constant 
			}
		}
	}
}