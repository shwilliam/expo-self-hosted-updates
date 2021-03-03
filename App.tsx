import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Updates from "expo-updates";

enum UpdateStatus {
  Checking = "checking",
  Pending = "pending",
  Fetching = "fetching",
  Standby = "standby",
}

export default function App() {
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>(
      UpdateStatus.Standby
    ),
    updateVersion = Updates.manifest?.version ?? "unknown",
    // TODO: run on app open/focus
    // TODO: don't run if dev env
    checkForUpdates = async () => {
      setUpdateStatus(UpdateStatus.Checking);
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setUpdateStatus(UpdateStatus.Fetching);
          await Updates.fetchUpdateAsync();
          setUpdateStatus(UpdateStatus.Pending);
        } else setUpdateStatus(UpdateStatus.Standby);
      } catch (error) {
        setUpdateStatus(UpdateStatus.Standby);
      }
    };

  return (
    <View style={styles.container}>
      <Text>{updateVersion}</Text>
      {updateStatus === UpdateStatus.Standby ? (
        <Button title="Check for Update" onPress={checkForUpdates} />
      ) : updateStatus === UpdateStatus.Pending ? (
        <Button title="Update now" onPress={() => Updates.reloadAsync()} />
      ) : (
        <Text>
          {updateStatus === UpdateStatus.Checking
            ? "Checking for update..."
            : updateStatus === UpdateStatus.Fetching
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
