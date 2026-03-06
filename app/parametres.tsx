
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 Pressable,
 ScrollView,
 Switch,
} from 'react-native';


export default function Parametres() {
 const router = useRouter();


 const [newsletter, setNewsletter] = useState(true);
 const [notifications, setNotifications] = useState(true);
 const [mode, setMode] = useState<'sombre' | 'clair'>('clair');


 const modeIsClair = mode === 'clair';


 const onLogout = () => {
   // fake logout: retour vers welcome
   router.replace('/(auth)/welcome');
 };


 const onDelete = () => {
   // placeholder : plus tard tu brancheras un vrai flow
 };


 const AccountRow = useMemo(
   () =>
     function Row({
       icon,
       label,
       onPress,
     }: {
       icon: keyof typeof Ionicons.glyphMap;
       label: string;
       onPress?: () => void;
     }) {
       return (
         <Pressable onPress={onPress} style={styles.linkRow}>
           <Ionicons name={icon} size={18} color="#BD61A6" />
           <Text style={styles.linkText}>{label}</Text>
         </Pressable>
       );
     },
   []
 );


 return (
   <View style={styles.screen}>
     <LinearGradient
       colors={['#FEF6EF', '#FEC271']}
       start={{ x: 0.5, y: 0 }}
       end={{ x: 0.5, y: 1 }}
       style={StyleSheet.absoluteFillObject}
     />


     {/* Header */}
     <View style={styles.header}>
       <Pressable onPress={() => router.back()} style={styles.backBtn}>
         <Ionicons name="chevron-back" size={26} color="#BD61A6" />
       </Pressable>
       <Text style={styles.headerTitle}>Paramètres du Profil</Text>
       <View style={{ width: 42 }} />
     </View>


     <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
       {/* Infos */}
       <View style={styles.infoCard}>
         <Field label="Nom" value="Léa" />
         <Field label="Identifiant" value="Lea" />
         <Field label="E-mail" value="lea...4@gmail.com" />
         <Field label="Mot de passe" value="********" />
       </View>


       <Pressable style={[styles.bigBtn, styles.bigBtnGold]}>
         <Text style={styles.bigBtnGoldText}>Gestion de l’abonnement</Text>
       </Pressable>


       <Pressable style={[styles.bigBtn, styles.bigBtnPink]}>
         <Text style={styles.bigBtnPinkText}>Paramètres Pomodoro</Text>
       </Pressable>


       {/* Mode d'affichage */}
       <Text style={styles.sectionTitle}>Mode d’affichage</Text>


       <View style={styles.segmentWrap}>
         <Pressable
           onPress={() => setMode('sombre')}
           style={[styles.segmentBtn, !modeIsClair ? styles.segmentOn : styles.segmentOff]}
         >
           <Text style={[styles.segmentText, !modeIsClair ? styles.segmentTextOn : styles.segmentTextOff]}>
             Sombre
           </Text>
         </Pressable>


         <Pressable
           onPress={() => setMode('clair')}
           style={[styles.segmentBtn, modeIsClair ? styles.segmentOn : styles.segmentOff]}
         >
           <Text style={[styles.segmentText, modeIsClair ? styles.segmentTextOn : styles.segmentTextOff]}>
             Clair
           </Text>
         </Pressable>
       </View>


       <Pressable style={[styles.bigBtn, styles.bigBtnPink]}>
         <Text style={styles.bigBtnPinkText}>Paramètres d’affichage</Text>
       </Pressable>


       {/* Toggles */}
       <Text style={styles.sectionSubtitle}>J’accepte</Text>


       <View style={styles.toggleRow}>
         <View style={styles.toggleLeft}>
           <Text style={styles.toggleLabel}>Newsletters par mail</Text>
         </View>
         <Switch
           value={newsletter}
           onValueChange={setNewsletter}
           trackColor={{ false: 'rgba(41,20,37,0.18)', true: 'rgba(189,97,166,0.55)' }}
           thumbColor={newsletter ? '#FFFFFF' : '#FFFFFF'}
         />
       </View>


       <View style={styles.toggleRow}>
         <View style={styles.toggleLeft}>
           <Text style={styles.toggleLabel}>Notifications</Text>
         </View>
         <Switch
           value={notifications}
           onValueChange={setNotifications}
           trackColor={{ false: 'rgba(41,20,37,0.18)', true: 'rgba(189,97,166,0.55)' }}
           thumbColor={notifications ? '#FFFFFF' : '#FFFFFF'}
         />
       </View>


       {/* Liens */}
       <View style={styles.linksBlock}>
         <AccountRow icon="help-circle-outline" label="Aides" onPress={() => {}} />
         <AccountRow icon="alert-circle-outline" label="Signalements" onPress={() => {}} />
         <AccountRow icon="chatbubble-ellipses-outline" label="Envoyer un commentaire" onPress={() => {}} />
         <AccountRow icon="document-text-outline" label="Mentions légales" onPress={() => {}} />
         <AccountRow icon="shield-checkmark-outline" label="Conditions et confidentialité" onPress={() => {}} />
         <AccountRow icon="information-circle-outline" label="Infos de l’application" onPress={() => {}} />
         <AccountRow icon="accessibility-outline" label="Accessibilité" onPress={() => {}} />
       </View>


       {/* Actions */}
       <Pressable style={[styles.bigBtn, styles.bigBtnPink]} onPress={onLogout}>
         <Text style={styles.bigBtnPinkText}>Déconnexion</Text>
       </Pressable>


       <Pressable style={[styles.bigBtn, styles.bigBtnPink]} onPress={onDelete}>
         <Text style={styles.bigBtnPinkText}>Supprimer le compte</Text>
       </Pressable>


       <View style={{ height: 18 }} />
     </ScrollView>
   </View>
 );
}


function Field({ label, value }: { label: string; value: string }) {
 return (
   <Pressable style={styles.field}>
     <View style={{ flex: 1 }}>
       <Text style={styles.fieldLabel}>{label}</Text>
       <Text style={styles.fieldValue} numberOfLines={1}>
         {value}
       </Text>
     </View>
     <Ionicons name="pencil" size={18} color="#FBB040" />
   </Pressable>
 );
}


const styles = StyleSheet.create({
 screen: { flex: 1, backgroundColor: '#FEF6EF' },


 header: {
   paddingTop: 54,
   paddingHorizontal: 18,
   paddingBottom: 10,
   flexDirection: 'row',
   alignItems: 'center',
   gap: 10,
 },
 backBtn: {
   width: 42,
   height: 42,
   borderRadius: 999,
   justifyContent: 'center',
   alignItems: 'center',
 },
 headerTitle: {
   flex: 1,
   textAlign: 'center',
   fontSize: 22,
   fontWeight: '900',
   color: '#291425',
 },


 content: {
   paddingHorizontal: 18,
   paddingBottom: 24,
 },


 infoCard: {
   marginTop: 6,
   gap: 10,
 },


 field: {
   backgroundColor: 'rgba(255,255,255,0.45)',
   borderRadius: 14,
   borderWidth: 1.5,
   borderColor: '#FBB040',
   paddingVertical: 10,
   paddingHorizontal: 14,
   flexDirection: 'row',
   alignItems: 'center',
   gap: 10,
 },
 fieldLabel: {
   fontSize: 13,
   fontWeight: '900',
   color: '#FBB040',
   marginBottom: 2,
 },
 fieldValue: {
   fontSize: 13,
   fontWeight: '800',
   color: 'rgba(41,20,37,0.70)',
 },


 bigBtn: {
   marginTop: 12,
   borderRadius: 16,
   paddingVertical: 14,
   alignItems: 'center',
   borderWidth: 1,
   borderColor: 'rgba(41,20,37,0.10)',
 },
 bigBtnGold: {
   backgroundColor: '#FBB040',
 },
 bigBtnGoldText: {
   fontSize: 18,
   fontWeight: '900',
   color: '#FFFFFF',
 },
 bigBtnPink: {
   backgroundColor: '#BD61A6',
 },
 bigBtnPinkText: {
   fontSize: 18,
   fontWeight: '900',
   color: '#FEF6EF',
 },


 sectionTitle: {
   marginTop: 16,
   textAlign: 'center',
   fontSize: 20,
   fontWeight: '900',
   color: '#BD61A6',
 },


 segmentWrap: {
   marginTop: 10,
   flexDirection: 'row',
   gap: 12,
   justifyContent: 'center',
 },
 segmentBtn: {
   width: 130,
   paddingVertical: 10,
   borderRadius: 14,
   borderWidth: 2,
   alignItems: 'center',
 },
 segmentOn: {
   backgroundColor: '#BD61A6',
   borderColor: 'rgba(41,20,37,0.10)',
 },
 segmentOff: {
   backgroundColor: 'transparent',
   borderColor: '#BD61A6',
 },
 segmentText: { fontSize: 16, fontWeight: '900' },
 segmentTextOn: { color: '#FEF6EF' },
 segmentTextOff: { color: '#BD61A6' },


 sectionSubtitle: {
   marginTop: 14,
   fontSize: 14,
   fontWeight: '900',
   color: '#BD61A6',
 },


 toggleRow: {
   marginTop: 10,
   backgroundColor: 'transparent',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
 },
 toggleLeft: {
   paddingVertical: 10,
   paddingHorizontal: 6,
 },
 toggleLabel: {
   fontSize: 14,
   fontWeight: '900',
   color: '#BD61A6',
 },


 linksBlock: {
   marginTop: 16,
   gap: 12,
 },
 linkRow: {
   flexDirection: 'row',
   alignItems: 'center',
   gap: 10,
 },
 linkText: {
   fontSize: 14,
   fontWeight: '800',
   color: '#BD61A6',
 },
});
