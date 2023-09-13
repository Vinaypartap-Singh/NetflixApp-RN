import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import plans from "../data/plans";

export default function PlansScreen() {
  const [selectedPlan, setSelectedPlan] = useState("Mobile");
  const [price, setPrice] = useState(199);
  console.log(selectedPlan, price);
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          paddingHorizontal: 20,
          color: "white",
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Choose the right plan for you
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              gap: 10,
              alignItems: "center",
            }}
          >
            <Feather name="check" size={24} color="#E50914" />
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Watch all you want ad free
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              gap: 10,
              alignItems: "center",
            }}
          >
            <Feather name="check" size={24} color="#E50914" />
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Recommendation just for you
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              gap: 10,
              alignItems: "center",
            }}
          >
            <Feather name="check" size={24} color="#E50914" />
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Cancel your plan anytime
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              gap: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Your Current Plan:
            </Text>
            <Text style={{ color: "#E50914", fontWeight: "500" }}>
              {selectedPlan}
            </Text>
          </View>
        </View>
        {/* Device Plans Option */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          {/* Card */}
          {plans.map((data, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedPlan(data.name);
                  setPrice(data.price);
                }}
                key={index}
                style={{
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: "#E50914",
                  borderRadius: 10,
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      color: "white",
                      backgroundColor: "#E50914",
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white" }}>{data.name}</Text>
                  </TouchableOpacity>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                  >
                    Price: ₹{data.price}
                  </Text>
                </View>
                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                  >
                    Video Quality: {data.videoQuality}
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                  >
                    Resolution: {data.resolution}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                  >
                    Devices you can watch on:
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    {data.devices.map((device, index) => {
                      return (
                        <Entypo
                          key={index}
                          name={device.name}
                          style={{ margin: 5 }}
                          size={24}
                          color="#E50914"
                        />
                      );
                    })}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#e50914",
          paddingVertical: 10,
          paddingTop: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: "#E50914",
          }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>
            Selected Plan {selectedPlan}
          </Text>
          <Text style={{ color: "white", fontSize: 18 }}>Pay ₹{price}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({});
