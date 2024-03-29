import java.net.*;
import java.io.*;
import java.util.*;
public class Multiserver {
public static void main(String[] args) 
{
Server Socket server = null;
try {
server = new ServerSocket ( 5000, 10); // create ServerSocket
System.out.println("Server is Running on port 5000");
}
catch (Exception ex) {
System.err.println(ex);
}
try {
System.out.println("Waiting for client to connect");
Socket client = server.accept();
Thread r = new ReadingThread (client);
Thread w= new WritingThread (client);
w.start();
r.start();
}
catch (Exception ex) {
System.err.println(ex);
} } }

class ReadingThread extends Thread {
private Socket connection;
public ReadingThread (Socket con) {
connection con;
}
public void run() {
try {
ObjectInputStream in = new ObjectInputStream( connection.getInputStream() );
String message;
while (true) {
message = ( String ) in.readobject();
System.out.println ("Server>>>" + message);
}
}
catch (Exception ex) {
System.err.println(ex);
} } } 

class WritingThread extends Thread {
private Socket connection;
public WritingThread (Socket con) {
connection = con;
public void run() 
{
try {
ObjectOutputStream out = new ObjectOutputStream( connection.getOutputStream() );
String message;
Scanner s = new Scanner(System.in);
while (true) {
System.out.print("Server>>>");
message = s.nextLine();
out.writeObject (message);
}
catch (Exception ex) {
System.err.println(ex);
} } } 
