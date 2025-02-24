type EditRecordFormProps = {
  editRecord: { date: string; dishName: string; note: string } | null;
  setEditRecord: React.Dispatch<
    React.SetStateAction<{
      date: string;
      dishName: string;
      note: string;
    } | null>
  >;
  handleUpdate: (updatedRecord: {
    date: string;
    dishName: string;
    note: string;
  }) => void;
};

export default function EditRecordForm({
  editRecord,
  setEditRecord,
  handleUpdate,
}: EditRecordFormProps) {
  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editRecord) {
      handleUpdate(editRecord);
    }
  };

  if (!editRecord) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>記録の編集</h3>
        <form onSubmit={handleEditSubmit}>
          <label>
            日付
            <input
              type="date"
              value={editRecord.date}
              onChange={(e) =>
                setEditRecord({ ...editRecord, date: e.target.value })
              }
              required
            />
          </label>
          <label>
            料理名
            <input
              type="text"
              value={editRecord.dishName}
              onChange={(e) =>
                setEditRecord({ ...editRecord, dishName: e.target.value })
              }
              required
            />
          </label>
          <label>
            メモ
            <textarea
              value={editRecord.note}
              onChange={(e) =>
                setEditRecord({ ...editRecord, note: e.target.value })
              }
            />
          </label>
          <button type="submit">保存</button>
          <button type="button" onClick={() => setEditRecord(null)}>
            キャンセル
          </button>
        </form>
      </div>
    </div>
  );
}
