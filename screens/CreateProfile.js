import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function CreateProfile() {
  const navigation = useNavigation();
  const user = auth.currentUser.uid;
  const [username, setUsername] = useState("");
  const [currentProfile, setCurrentProfile] = useState("");

  const profileImages = [
    {
      id: "0",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5_C49-HkFimzHQHqQwMLnCq4fHr1pgLtvw&usqp=CAU",
    },
    {
      id: "1",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOQfOPr1m7jryKxiCFP4IShrr88EWnR2mZJQ&usqp=CAU",
    },
    {
      id: "2",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPsVAeFlYeYOEUzb3TV1ML91_LPkkFML5lRQcMdr9nQu2CqO-WzT-RLmkM5_cOKvkaBkI&usqp=CAU",
    },
    {
      id: "3",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-yQFL1YOsN3esm6p1jB1HT-Q6qKtxtZqh9LGwMDIgDCy-p54eMf8jdGSN6yZUeySqseA&usqp=CAU",
    },
  ];

  const createProfile = async () => {
    try {
      const docRef = doc(db, "users", `${user}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists) {
        const existingData = docSnap.data();

        const newProfile = {
          Name: username,
          Image: currentProfile,
        };

        if (existingData.profile) {
          existingData.profile.push(newProfile);
          Alert.alert(
            "Profile Created",
            "New profile has created successfully",
            [
              {
                text: "Ok",
                style: "destructive",
              },
            ]
          );
          navigation.replace("Profile");
        } else {
          existingData.profile = [newProfile];
        }

        await setDoc(
          docRef,
          {
            profile: existingData.profile,
          },
          {
            merge: true,
          }
        );
      } else {
        console.log("Document Does Not Exist");
      }
    } catch (error) {
      Alert.alert("Error", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", paddingHorizontal: 20 }}>
      <Text
        style={{
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Create New Profile
      </Text>
      {/* Options */}

      <View style={{ marginTop: 40 }}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={"white"}
          autoCorrect={false}
          onChangeText={(text) => setUsername(text)}
          style={{
            backgroundColor: "#1c1c1c",
            paddingVertical: 18,
            paddingHorizontal: 30,
            borderRadius: 5,
            color: "white",
            fontSize: 15,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
          marginTop: 30,
        }}
      >
        {profileImages.map((data, index) => {
          const hightlightImage = currentProfile == data.image;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentProfile(data.image)}
            >
              <Image
                source={{ uri: data.image }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: hightlightImage ? "white" : "black",
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          onPress={createProfile}
          style={{
            backgroundColor:
              username.length >= 4 && currentProfile !== ""
                ? "#E50914"
                : "#1c1c1c",
            paddingVertical: 15,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Create Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
