import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Ensure environment variables are loaded regardless of current working directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

/**
 * Sanitizes MongoDB connection URIs to prevent credentials/passwords
 * from appearing in console logs or error messages.
 */
export const sanitizeMongoUri = (uri) => {
  if (!uri || typeof uri !== 'string') return '';
  return uri.replace(
    /(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/i,
    '$1<db_password_hidden>$3'
  );
};

const connectDB = async () => {
  // Support both MONGODB_URI and legacy MONGO_URI
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUri) {
    console.warn(
      'MongoDB connection notice: MONGODB_URI (or MONGO_URI) environment variable is not defined.'
    );
    return;
  }

  try {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(mongoUri);
    console.log(
      `MongoDB connected successfully: host=${conn.connection.host}, database=${conn.connection.name}`
    );
  } catch (error) {
    // Sanitize any error output so credentials are never leaked
    const safeError = (error?.message || '').replace(
      /(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/i,
      '$1<db_password_hidden>$3'
    );
    console.error(`MongoDB connection error: ${safeError}`);
  }
};

// Monitor runtime connection lifecycle
mongoose.connection.on('error', (err) => {
  const safeErr = (err?.message || '').replace(
    /(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/i,
    '$1<db_password_hidden>$3'
  );
  console.error(`MongoDB runtime connection error: ${safeErr}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Automatic reconnection will be attempted by Mongoose.');
});

export default connectDB;
