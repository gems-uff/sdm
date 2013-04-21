vec4 t1 = texture2D(Lean1, gl_TexCoord[0].st);
vec3 Normal = vec3(t1.xyz) * 2.0 - 1.0;
 //	Equivalence for the Blinn-Phon is 1 / s, where s is the specular expoent. This is done here to remove the dependancy on the lean map creation.
float power = 1.0 / MaterialShininess;
//	Unpack B and M
vec4 t2 = texture2D(Lean2, gl_TexCoord[0].st);
vec2 B = (t2.xy * 2.0 - 1.0) * scaleFactor;
vec3 M = vec3(t2.zw + power, t1.w * 2.0 - 1.0) * scaleFactor * scaleFactor;
//Convert M to E
vec3 E = M - vec3(B * B, B.x * B.y);
float Det = E.x * E.y - E.z * E.z;
//	Compute LEAN Specular term
vec2 h = Half.xy / Half.z - B;
float e = (h.x * h.x * E.y + h.y * h.y * E.x - 2.0 * h.x * h.y * E.z);
float spec = (Det <= 0.0) ? 0.0 : exp(-0.5 * e / Det) / sqrt(Det);
//	Normal dot LightDirection
float NdotL = clamp (dot (Normal, fvLightDirection , 0.0, 1.0);
fvTotalDiffuse = fvMaterialDiffuse * NdotL;
//	Spec Fading Computation
float specFading = 1.0 + (pow(ViewDirection.z * SpecFadeRange, 2.0) );
specFading = clamp(specFading, 1.0, P_max);
//	Add specFading to Specular component
fvTotalSpecular = fvMaterialSpecular * pow(NdotL, specFading) * spec;
//	Compute Fresnel
float fFresnel = clamp(FresnelBias + (FresnelScale * pow(1.0 - dot(Normal, fvViewDirection), 5.0)), 0.0, 1.0); 
fvTotalSpecular *= fFresnel;
//	Final Color
color = (fvTotalDiffuse + fvTotalSpecular).xyz * LightColor.xyz;