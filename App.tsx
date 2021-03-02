import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Updates from "expo-updates";

export default function App() {
  const [updateStatus, setUpdateStatus] = useState<
      "CHECKING" | "PENDING" | "FETCHING" | "STANDBY"
    >("STANDBY"),
    checkForUpdates = async () => {
      setUpdateStatus("CHECKING");
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setUpdateStatus("FETCHING");
        await Updates.fetchUpdateAsync();
        setUpdateStatus("PENDING");
      } else setUpdateStatus("STANDBY");
    };

  return (
    <View style={styles.container}>
      <Text>{Updates.manifest?.version ?? "unknown version"}</Text>
      {updateStatus === "STANDBY" ? (
        <Button title="Check for Update" onPress={checkForUpdates} />
      ) : updateStatus === "PENDING" ? (
        <Button title="Update now" onPress={() => Updates.reloadAsync()} />
      ) : (
        <Text>
          {updateStatus === "CHECKING"
            ? "Checking for update..."
            : updateStatus === "FETCHING"
            ? "Downloading update..."
            : null}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
