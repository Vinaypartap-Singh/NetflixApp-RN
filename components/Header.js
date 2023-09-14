import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function Header() {
  const [movies, setMovies] = useState();
  const api = "9f0d60fb73ce2b261485d824070652f5";
  useEffect(() => {
    const movieData = async () => {
      await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${api}&language=en-US`
      )
        .then((response) => response.json())
        .then((data) =>
          setMovies(
            data.results[Math.floor(Math.random() * data.results.length - 1)]
          )
        );
    };
    movieData();
  }, []);
  return (
    <View>
      <ImageBackground
        style={{
          width: "100%",
          height: 480,
          position: "relative",
        }}
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movies?.poster_path}`,
        }}
      >
        {/* Background Color View */}
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></View>
        {/* Data View Component */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              source={{
                uri: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png",
              }}
              style={{ width: 130, height: 70 }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              marginRight: 10,
            }}
          >
            <AntDesign name="search1" size={24} color="white" />
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPsVAeFlYeYOEUzb3TV1ML91_LPkkFML5lRQcMdr9nQu2CqO-WzT-RLmkM5_cOKvkaBkI&usqp=CAU",
              }}
              style={{ width: 40, height: 40, borderRadius: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            TV Shows
          </Text>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            Movies
          </Text>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            Categories
          </Text>
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 60,
          marginTop: 20,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <AntDesign name="plus" size={28} color={"white"} />
          <Text style={{ color: "white" }}>My List</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            backgroundColor: "white",
            paddingHorizontal: 35,
            borderRadius: 5,
            paddingVertical: 5,
          }}
        >
          <Entypo name="controller-play" size={28} color="black" />
          <Text>My List</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <AntDesign name="infocirlceo" size={28} color="white" />
          <Text style={{ color: "white" }}>Info</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
