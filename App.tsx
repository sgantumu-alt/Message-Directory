import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

type Message = {
  id: number;
  text: string;
  time: string;
  file?: string;
};

type Directory = {
  id: number;
  name: string;
  icon: string;
  color: string;
  messages: Message[];
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [dark, setDark] = useState(false);
  const [directorySearch, setDirectorySearch] = useState("");
  const [messageSearch, setMessageSearch] = useState("");
  const [newDirectory, setNewDirectory] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedId, setSelectedId] = useState(1);

  const [directories, setDirectories] = useState<Directory[]>([
    {
      id: 1,
      name: "School",
      icon: "📁",
      color: "#6C63FF",
      messages: [
        { id: 1, text: "Test.", time: "2026-05-30 09:20" },
        { id: 2, text: "Test.", time: "2026-05-29 15:45" },
      ],
    },
    {
      id: 2,
      name: "Family",
      icon: "📁",
      color: "#FF6B6B",
      messages: [
        { id: 1, text: "Test", time: "2026-05-28 18:30" },
        { id: 2, text: "Test", time: "2026-05-27 12:10" },
      ],
    },
    {
      id: 3,
      name: "Work",
      icon: "📁",
      color: "#00B4D8",
      messages: [
        { id: 1, text: "Test", time: "2026-05-30 11:00" },
        { id: 2, text: "Test.", time: "2026-05-26 10:15" },
      ],
    },
    {
      id: 4,
      name: "Friends",
      icon: "📁",
      color: "#FF5DA2",
      messages: [
        { id: 1, text: "Test.", time: "2026-05-25 17:00" },
      ],
    },
  ]);

  const selected = directories.find((d) => d.id === selectedId) || directories[0];

  const filteredDirectories = directories.filter((d) =>
    d.name.toLowerCase().includes(directorySearch.toLowerCase())
  );

  const filteredMessages = useMemo(() => {
    return [...selected.messages]
      .filter((m) => m.text.toLowerCase().includes(messageSearch.toLowerCase()))
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  }, [selected, messageSearch]);

  

function addDirectory() {
  const name = newDirectory.trim();

  if (!name) {
    alert("Enter directory name");
    return;
  }

  const newItem = {
    id: Date.now(),
    name: name,
    icon: "📁",
    color: "#10B981",

    messages: [
      {
        id: Date.now() + 1,
        text: `Welcome to ${name}`,
        time: new Date().toLocaleString(),
      },
    ],
  };

  setDirectories((prev) => [...prev, newItem]);

  setSelectedId(newItem.id);

  setNewDirectory("");

  setDirectorySearch("");

  setMessageSearch("");
}

  function addMessage() {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage.trim(),
      time: new Date().toLocaleString(),
    };

    setDirectories(
      directories.map((d) =>
        d.id === selectedId ? { ...d, messages: [...d.messages, message] } : d
      )
    );

    setNewMessage("");
  }

  function deleteMessage(id: number) {
    setDirectories(
      directories.map((d) =>
        d.id === selectedId
          ? { ...d, messages: d.messages.filter((m) => m.id !== id) }
          : d
      )
    );
  }

  async function uploadFile() {
    const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });

    if (result.canceled) return;

    const fileName = result.assets[0].name;

    const fileMessage: Message = {
      id: Date.now(),
      text: `Uploaded file: ${fileName}`,
      time: new Date().toLocaleString(),
      file: fileName,
    };

    setDirectories(
      directories.map((d) =>
        d.id === selectedId
          ? { ...d, messages: [...d.messages, fileMessage] }
          : d
      )
    );

    Alert.alert("File uploaded", fileName);
  }

if (!loggedIn) {
  return (
    <View style={[styles.loginContainer, dark && styles.dark]}>
      <Text style={[styles.loginTitle, dark && styles.lightText]}>
        Messages Directory 
      </Text>

      <Text style={[styles.loginSubtitle, dark && styles.lightText]}>
        
      </Text>

      <TextInput
        placeholder="Enter your username"
        placeholderTextColor="#94A3B8"
        style={styles.loginInput}
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          if (!username.trim()) {
            alert("Please enter your username");
            return;
          }
          setLoggedIn(true);
        }}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setDark(!dark)}>
        <Text style={styles.loginMode}>{dark ? "☀️ Light Mode" : "🌙 Dark Mode"}</Text>
      </TouchableOpacity>
    </View>
  );
}

  return (
    <ScrollView contentContainerStyle={[styles.container, dark && styles.dark]}>
      <View style={styles.topBar}>
        <TextInput
          placeholder="Search directories..."
          placeholderTextColor="#94A3B8"
          style={[styles.mainSearch, dark && styles.darkCard]}
          value={directorySearch}
          onChangeText={setDirectorySearch}
        />

        <TouchableOpacity style={styles.modeButton} onPress={() => setDark(!dark)}>
          <Text style={styles.modeText}>{dark ? "☀️" : "🌙"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.createRow}>
        <TextInput
          placeholder="Create new directory..."
          placeholderTextColor="#94A3B8"
          style={[styles.createInput, dark && styles.darkCard]}
          value={newDirectory}
          onChangeText={setNewDirectory}
        />
<TouchableOpacity
 style={styles.addButton}
 onPress={addDirectory}
>
<Text style={styles.addText}>＋</Text>
</TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {filteredDirectories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.card,
              dark && styles.darkCard,
              selectedId === item.id && { borderColor: item.color, borderWidth: 3 },
            ]}
            onPress={() => setSelectedId(item.id)}
          >
            <View style={[styles.circle, { backgroundColor: item.color }]}>
              <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <Text style={[styles.cardText, { color: item.color }]}>{item.name}</Text>
            <Text style={[styles.count, dark && styles.lightText]}>
              {item.messages.length} messages
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.panel, dark && styles.darkCard]}>
        <Text style={[styles.panelTitle, dark && styles.lightText]}>
          {selected.icon} {selected.name}
        </Text>

        <TextInput
          placeholder="Search messages..."
          placeholderTextColor="#94A3B8"
          style={styles.messageSearch}
          value={messageSearch}
          onChangeText={setMessageSearch}
        />

        {filteredMessages.map((msg) => (
          <View key={msg.id} style={styles.messageCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.messageText}>{msg.text}</Text>
              <Text style={styles.timeText}>{msg.time}</Text>
              {msg.file && <Text style={styles.fileText}>📎 {msg.file}</Text>}
            </View>

            <TouchableOpacity style={styles.binButton} onPress={() => deleteMessage(msg.id)}>
              <Text style={styles.bin}>🗑️</Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.sendRow}>
          <TextInput
            placeholder="Write new message..."
            placeholderTextColor="#94A3B8"
            style={styles.messageInput}
            value={newMessage}
            onChangeText={setNewMessage}
          />

          <TouchableOpacity style={[styles.sendButton, { backgroundColor: selected.color }]} onPress={addMessage}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.uploadButton} onPress={uploadFile}>
          <Text style={styles.uploadText}>📎 Upload file to this directory</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
  style={styles.logoutButton}
  onPress={() => {
    setLoggedIn(false);
    setUsername("");
  }}
>
  <Text style={styles.logoutText}>
     Log out
  </Text>
</TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F6F7FB",
    padding: 22,
    alignItems: "center",
  },
  dark: { backgroundColor: "#0F172A" },
  topBar: {
    width: "100%",
    maxWidth: 650,
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  mainSearch: {
    flex: 1,
    backgroundColor: "white",
    padding: 18,
    borderRadius: 24,
    fontSize: 18,
    fontWeight: "700",
  },
  modeButton: {
    width: 58,
    borderRadius: 22,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },
  modeText: { fontSize: 24 },
  createRow: {
    width: "100%",
    maxWidth: 650,
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  createInput: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    fontSize: 16,
  },
  addButton: {
    width: 55,
    backgroundColor: "#6C63FF",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: { color: "white", fontSize: 28, fontWeight: "900" },
  grid: {
    width: "100%",
    maxWidth: 650,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  card: {
    width: 150,
    height: 165,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  darkCard: { backgroundColor: "#1E293B", color: "white" },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: { fontSize: 30 },
  cardText: { fontSize: 21, fontWeight: "900" },
  count: { fontSize: 13, color: "#64748B", marginTop: 4 },
  panel: {
    width: "100%",
    maxWidth: 650,
    backgroundColor: "white",
    marginTop: 28,
    borderRadius: 34,
    padding: 24,
    elevation: 5,
  },
  panelTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: "#111827",
    textAlign: "center",
    marginBottom: 18,
  },
  lightText: { color: "#F8FAFC" },
  messageSearch: {
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  messageCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  messageText: { fontSize: 16, color: "#312E81", fontWeight: "700" },
  timeText: { fontSize: 12, color: "#64748B", marginTop: 5 },
  fileText: { fontSize: 13, color: "#2563EB", marginTop: 5, fontWeight: "700" },
  binButton: {
    width: 42,
    height: 42,
    backgroundColor: "#EF4444",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  bin: { fontSize: 20 },
  sendRow: { flexDirection: "row", gap: 10, marginTop: 12 },
  messageInput: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 14,
    borderRadius: 18,
    fontSize: 15,
  },
  sendButton: {
    paddingHorizontal: 20,
    borderRadius: 18,
    justifyContent: "center",
  },
  sendText: { color: "white", fontWeight: "900" },
  uploadButton: {
    marginTop: 14,
    backgroundColor: "#EDE9FE",
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
  },
  uploadText: {
    color: "#4338CA",
    fontWeight: "900",
  },
  loginContainer: {
  flex: 1,
  backgroundColor: "#F6F7FB",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
},

loginTitle: {
  fontSize: 38,
  fontWeight: "900",
  color: "#111827",
  marginBottom: 10,
},

loginSubtitle: {
  fontSize: 16,
  color: "#64748B",
  marginBottom: 28,
},

loginInput: {
  width: "90%",
  maxWidth: 420,
  backgroundColor: "white",
  padding: 17,
  borderRadius: 22,
  fontSize: 16,
  marginBottom: 16,
},

loginButton: {
  width: "90%",
  maxWidth: 420,
  backgroundColor: "#6C63FF",
  padding: 17,
  borderRadius: 22,
  alignItems: "center",
  marginBottom: 18,
},

loginButtonText: {
  color: "white",
  fontSize: 18,
  fontWeight: "900",
},

loginMode: {
  color: "#6C63FF",
  fontSize: 16,
  fontWeight: "800",
},
logoutButton: {
  width: "100%",
  maxWidth: 100,
  backgroundColor: "#EF4444",
  padding: 12,
  borderRadius: 12,
  marginTop: 20,
  alignItems: "center",
},

logoutText: {
  color: "white",
  fontSize: 14,
  fontWeight: "900",
},
});