/**
 * data.js
 * ------------------------------------------------------------------
 * This file handles all data operations (CRUD: Create, Read, Update, Delete).
 * It uses 'localStorage' to persist data across browser sessions.
 * ------------------------------------------------------------------
 */

// Key used for localStorage
const STORAGE_KEY = "finderhub_items";

// Default data for first-time users
const INITIAL_DATA = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    category: "โทรศัพท์ / ไอที",
    location: "ห้องสมุด ชั้น 2",
    date: "2023-11-15T09:30",
    description: "พบวางอยู่บนโต๊ะอ่านหนังสือ เคสสีน้ำเงิน",
    image: "https://placehold.co/300x200?text=iPhone+15",
    status: "found",
    contact: "สำนักงานรักษาความปลอดภัย",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    category: "โทรศัพท์ / ไอที",
    location: "โรงอาหาร อาคาร 10",
    date: "2023-11-16T12:15",
    description: "ลืมไว้ที่โต๊ะอาหาร สีดำ",
    image: "https://placehold.co/300x200?text=Samsung+S24",
    status: "found",
    contact: "เคาน์เตอร์ประชาสัมพันธ์",
  },
  {
    id: "3",
    name: "iPad Air 5",
    category: "โทรศัพท์ / ไอที",
    location: "ห้องเรียน 405",
    date: "2023-11-14T14:00",
    description: "สีชมพู ใส่เคสใส มีสติ๊กเกอร์รูปแมว",
    image: "https://placehold.co/300x200?text=iPad+Air",
    status: "returned",
    contact: "ห้องพักอาจารย์",
  },
  {
    id: "4",
    name: "หูฟัง Sony WH-1000XM5",
    category: "โทรศัพท์ / ไอที",
    location: "ห้องคอมพิวเตอร์ 2",
    date: "2023-11-17T16:45",
    description: "สีเงิน วางอยู่ข้างจอคอมพิวเตอร์",
    image: "https://placehold.co/300x200?text=Sony+Headphones",
    status: "found",
    contact: "เจ้าหน้าที่ห้องคอม",
  },
  {
    id: "5",
    name: "Power Bank Eloop",
    category: "โทรศัพท์ / ไอที",
    location: "ม้านั่งหน้าตึก 9",
    date: "2023-11-18T10:20",
    description: "ความจุ 20000mAh สีขาว มีสายชาร์จคาอยู่",
    image: "https://placehold.co/300x200?text=Power+Bank",
    status: "found",
    contact: "ป้อมยามหน้าตึก",
  },
  {
    id: "6",
    name: "กระเป๋าสตางค์หนัง",
    category: "ของใช้ส่วนตัว",
    location: "ห้องน้ำชาย ชั้น 1",
    date: "2023-11-19T11:00",
    description: "สีน้ำตาล ยี่ห้อ Coach มีบัตรประชาชน",
    image: "https://placehold.co/300x200?text=Wallet",
    status: "found",
    contact: "สำนักงานรักษาความปลอดภัย",
  },
  {
    id: "7",
    name: "กุญแจรถ Honda",
    category: "ของใช้ส่วนตัว",
    location: "ลานจอดรถ A",
    date: "2023-11-20T08:15",
    description: "พวงกุญแจรูปโดราเอมอน",
    image: "https://placehold.co/300x200?text=Car+Keys",
    status: "found",
    contact: "ป้อมยามลานจอดรถ",
  },
  {
    id: "8",
    name: "แว่นกันแดด Rayban",
    category: "ของใช้ส่วนตัว",
    location: "ร้านกาแฟ ใต้อาคาร 11",
    date: "2023-11-13T13:30",
    description: "รุ่น Aviator กรอบทอง เลนส์สีเขียว",
    image: "https://placehold.co/300x200?text=Sunglasses",
    status: "returned",
    contact: "พนักงานร้านกาแฟ",
  },
  {
    id: "9",
    name: "บัตรนักศึกษา",
    category: "ของใช้ส่วนตัว",
    location: "ทางเดินเชื่อมตึก 5-6",
    date: "2023-11-15T15:40",
    description: "คณะวิศวกรรมศาสตร์ รหัสนักศึกษา 66xxxxxx",
    image: "https://placehold.co/300x200?text=Student+ID",
    status: "found",
    contact: "ห้องทะเบียน",
  },
  {
    id: "10",
    name: "ร่มพับสีแดง",
    category: "อื่นๆ",
    location: "หน้าลิฟต์ อาคาร 3",
    date: "2023-11-12T17:00",
    description: "ลายจุดสีขาว ด้ามจับพลาสติก",
    image: "https://placehold.co/300x200?text=Umbrella",
    status: "found",
    contact: "แม่บ้านประจำตึก",
  },
  {
    id: "11",
    name: "แก้วเก็บความเย็น Tyeso",
    category: "อื่นๆ",
    location: "ห้องเรียน 302",
    date: "2023-11-18T09:00",
    description: "สีเขียวมิ้นท์ ขนาด 30oz",
    image: "https://placehold.co/300x200?text=Tumbler",
    status: "returned",
    contact: "ห้องพักอาจารย์",
  },
  {
    id: "12",
    name: "หนังสือ Calculus 1",
    category: "หนังสือ / เครื่องเขียน",
    location: "โต๊ะม้าหินอ่อน หลังตึก 7",
    date: "2023-11-14T16:20",
    description: "สภาพใหม่ มีชื่อเขียนที่ปกใน",
    image: "https://placehold.co/300x200?text=Textbook",
    status: "found",
    contact: "ห้องสมุด",
  },
  {
    id: "13",
    name: "สมุดจดบันทึก Moleskine",
    category: "หนังสือ / เครื่องเขียน",
    location: "ห้องประชุมเล็ก",
    date: "2023-11-16T11:10",
    description: "ปกแข็งสีดำ มีปากกาเสียบอยู่",
    image: "https://placehold.co/300x200?text=Notebook",
    status: "found",
    contact: "เลขาหน้าห้องประชุม",
  },
  {
    id: "14",
    name: "ปากกา Lamy Safari",
    category: "หนังสือ / เครื่องเขียน",
    location: "ห้องแล็บเคมี",
    date: "2023-11-19T14:50",
    description: "สีเหลือง หมึกสีน้ำเงิน",
    image: "https://placehold.co/300x200?text=Pen",
    status: "returned",
    contact: "อาจารย์ประจำวิชา",
  },
  {
    id: "15",
    name: "เครื่องคิดเลข Casio fx-991EX",
    category: "หนังสือ / เครื่องเขียน",
    location: "ห้องสอบ 401",
    date: "2023-11-17T12:00",
    description: "มีสติ๊กเกอร์ชื่อติดอยู่ด้านหลัง",
    image: "https://placehold.co/300x200?text=Calculator",
    status: "found",
    contact: "กองบริการการศึกษา",
  },
];

// Initialize data if storage is empty
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
}

/**
 * DataManager Object
 * Contains methods to interact with the data.
 */
export const DataManager = {
  /**
   * Retrieve all items from storage.
   * @returns {Array} List of items.
   */
  getAllItems: () => {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  },

  /**
   * Find a specific item by its ID.
   * @param {string} id - The ID of the item.
   * @returns {Object|undefined} The item object or undefined if not found.
   */
  getItemById: (id) => {
    const items = DataManager.getAllItems();
    return items.find((item) => item.id === id);
  },

  /**
   * Add a new item to storage.
   * @param {Object} item - The item object to add.
   */
  addItem: (item) => {
    const items = DataManager.getAllItems();
    const newItem = {
      ...item,
      id: Date.now().toString(), // Generate unique ID based on timestamp
      status: "found", // Default status
    };
    items.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },

  /**
   * Update the status of an item.
   * @param {string} id - Item ID.
   * @param {string} newStatus - New status ('found' or 'returned').
   * @param {Object} additionalData - Optional data to merge (e.g., claimer info).
   */
  updateItemStatus: (id, newStatus, additionalData = {}) => {
    const items = DataManager.getAllItems();
    const item = items.find((i) => i.id === id);

    if (item) {
      item.status = newStatus;
      // Merge additional data if provided
      if (Object.keys(additionalData).length > 0) {
        Object.assign(item, additionalData);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  },

  /**
   * Delete an item permanently.
   * @param {string} id - Item ID.
   */
  deleteItem: (id) => {
    let items = DataManager.getAllItems();
    items = items.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  },
};
