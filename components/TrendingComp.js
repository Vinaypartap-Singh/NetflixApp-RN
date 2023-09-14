import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

const TrendingComp = () => {
  const api = "9f0d60fb73ce2b261485d824070652f5";
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const movieData = async () => {
      await fetch(
        `https://api.themoviedb.org/3/trending/all/week?api_key=${api}&language=en-US`
      )
        .then((response) => response.json())
        .then((data) => setMovies(data.results));
    };
    movieData();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <ScrollView horizontal showsVerticalScrollIndicator={false}>
        {movies.slice(0, 10).map((movie, id) => (
          <TouchableOpacity
            key={id}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: 65,
                color: "white",
                fontWeight: "bold",
                position: "absolute",
                zIndex: 5,
                bottom: 10,
                left: 10,
                marginTop: 20,
              }}
            >
              {id + 1}
            </Text>

            <Image
              style={{
                width: 105,
                margin: 10,
                height: 152,
                borderRadius: 6,
                resizeMode: "cover",
              }}
              source={{
                uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path}`,
              }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TrendingComp;
