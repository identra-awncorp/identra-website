PID=$(ps aux | grep node | grep fix-isvi.cjs | head -n 1 | awk '{print $2}')
if [ -n "$PID" ]; then
  kill -9 $PID
  echo "Killed $PID"
fi
