import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        const docRef = doc(db, "users", `${authUser.uid}`);

        try {
          const docSnapshot = await getDoc(docRef);

          if (docSnapshot.exists()) {
            const sub = docSnapshot.data();
            // console.log(sub);
            if (
              sub.subscription === "Standard" ||
              sub.subscription === "Mobile" ||
              sub.subscription === "Premium" ||
              sub.subscription === "Basic"
            ) {
              navigation.navigate("Profile");
            } else {
              navigation.navigate("Plans");
            }
          } else {
            console.log("Document does not exist");
          }
        } catch (error) {
          console.log("Error");
        }
      }
    });

    return unsubscribe;
  }, []);

  const loginUser = () => {
    if (email === "" || password === "") {
      Alert.alert("Invalid Details", "Please fill all the details to login", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Ok",
          style: "default",
        },
      ]);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigation.navigate("Plans");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Alert.alert("Error", errorMessage, [
            {
              text: "Ok",
              style: "cancel",
            },
          ]);
        });
    }
  };

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? (
        <View>
          <ActivityIndicator size={"large"} color={"#E50914"} />
        </View>
      ) : (
        <KeyboardAvoidingView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={{
                uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png",
              }}
              style={{
                width: 170,
                height: 70,
                objectFit: "cover",
              }}
            />
          </View>
          <View style={{ width: 300, marginTop: 20 }}>
            <TextInput
              value={email}
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              placeholderTextColor={"white"}
              style={{
                color: "white",
                borderWidth: 1,
                borderColor: "grey",
                paddingVertical: 18,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: "grey",
              }}
            />
          </View>
          <View style={{ width: 300, marginTop: 20 }}>
            <TextInput
              value={password}
              onChangeText={(password) => setPassword(password)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={"white"}
              style={{
                color: "white",
                borderWidth: 1,
                borderColor: "grey",
                paddingVertical: 18,
                paddingHorizontal: 10,
                borderRadius: 5,
                backgroundColor: "grey",
              }}
            />
          </View>
          <View style={{ width: 300, marginTop: 20 }}>
            <TouchableOpacity
              onPress={loginUser}
              style={{
                borderWidth: 1,
                borderColor: password.length > 8 ? "red" : "white",
                paddingVertical: 20,
                borderRadius: 5,
                backgroundColor: password.length > 8 ? "red" : "black",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: 300,
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Register Now
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
